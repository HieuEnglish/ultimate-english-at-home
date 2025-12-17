param(
  [int]$Port = 5173
)

$ErrorActionPreference = "Stop"

$root = Resolve-Path (Join-Path $PSScriptRoot "..")
$prefix = "http://localhost:$Port/"

$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add($prefix)

try {
  $listener.Start()
} catch {
  Write-Host "[ERROR] Failed to start server on $prefix"
  Write-Host "Common cause: port already in use. Try a different port, e.g. -Port 5174"
  throw
}

Write-Host "UEAH dev server running:"
Write-Host "  $prefix"
Write-Host "Press Ctrl+C to stop."
Write-Host ""

$mime = @{
  ".html" = "text/html; charset=utf-8"
  ".css"  = "text/css; charset=utf-8"
  ".js"   = "application/javascript; charset=utf-8"
  ".json" = "application/json; charset=utf-8"
  ".svg"  = "image/svg+xml"
  ".png"  = "image/png"
  ".jpg"  = "image/jpeg"
  ".jpeg" = "image/jpeg"
  ".gif"  = "image/gif"
  ".txt"  = "text/plain; charset=utf-8"
  ".xml"  = "application/xml; charset=utf-8"
  ".ico"  = "image/x-icon"
}

function Get-ContentType([string]$path) {
  $ext = [System.IO.Path]::GetExtension($path).ToLowerInvariant()
  if ($mime.ContainsKey($ext)) { return $mime[$ext] }
  return "application/octet-stream"
}

try {
  while ($listener.IsListening) {
    $ctx = $listener.GetContext()
    $req = $ctx.Request
    $res = $ctx.Response

    try {
      $rawPath = $req.Url.AbsolutePath
      $path = [Uri]::UnescapeDataString($rawPath)

      if ($path -eq "/") {
        $path = "/index.html"
      } elseif ($path.EndsWith("/")) {
        $path = $path + "index.html"
      }

      $candidate = Join-Path $root ($path.TrimStart("/").Replace("/", "\"))
      $full = Resolve-Path -LiteralPath $candidate -ErrorAction SilentlyContinue

      if (-not $full) {
        $fallback = Join-Path $root "404.html"
        if (Test-Path -LiteralPath $fallback) {
          $bytes = [System.Text.Encoding]::UTF8.GetBytes((Get-Content -LiteralPath $fallback -Raw))
          $res.StatusCode = 404
          $res.ContentType = "text/html; charset=utf-8"
          $res.OutputStream.Write($bytes, 0, $bytes.Length)
          $res.Close()
          continue
        }

        $res.StatusCode = 404
        $res.Close()
        continue
      }

      if (-not ($full.Path.StartsWith($root.Path, [System.StringComparison]::OrdinalIgnoreCase))) {
        $res.StatusCode = 403
        $res.Close()
        continue
      }

      $contentType = Get-ContentType $full.Path
      $res.ContentType = $contentType

      if ($contentType.StartsWith("text/") -or $contentType.Contains("javascript") -or $contentType.Contains("json") -or $contentType.Contains("xml")) {
        $bytes = [System.Text.Encoding]::UTF8.GetBytes((Get-Content -LiteralPath $full.Path -Raw))
        $res.OutputStream.Write($bytes, 0, $bytes.Length)
      } else {
        $bytes = [System.IO.File]::ReadAllBytes($full.Path)
        $res.OutputStream.Write($bytes, 0, $bytes.Length)
      }

      $res.Close()
    } catch {
      try { $res.StatusCode = 500; $res.Close() } catch {}
    }
  }
} finally {
  $listener.Stop()
  $listener.Close()
}
