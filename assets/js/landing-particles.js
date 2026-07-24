const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
const mount = document.getElementById('hero-3d');

if (mount && !reduceMotion) {
  import('https://cdn.jsdelivr.net/npm/three@0.185.1/build/three.module.js')
    .then(THREE => {
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(48, 1, .1, 100);
      camera.position.set(0, 0, 8.5);

      const renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: false,
        powerPreference: 'high-performance'
      });
      renderer.setPixelRatio(Math.min(devicePixelRatio, 1.75));
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      mount.prepend(renderer.domElement);
      document.querySelector('.hero')?.classList.add('has-webgl', 'has-particles');

      const COUNT = innerWidth < 700 ? 2000 : 4000;
      const homes = new Float32Array(COUNT * 3);
      const positions = new Float32Array(COUNT * 3);
      const colors = new Float32Array(COUNT * 3);
      const seeds = new Float32Array(COUNT);
      const color = new THREE.Color();

      const palette = {
        paper: new THREE.Color('#f8f2df'),
        ink: new THREE.Color('#8581ac'),
        purple: new THREE.Color('#8b72ff'),
        cyan: new THREE.Color('#4fc3f7'),
        pink: new THREE.Color('#f472b6'),
        cover: new THREE.Color('#34206f')
      };

      const put = (i, x, y, z, tint, shade = 1) => {
        const p = i * 3;
        homes[p] = positions[p] = x;
        homes[p + 1] = positions[p + 1] = y;
        homes[p + 2] = positions[p + 2] = z;
        color.copy(tint).multiplyScalar(shade);
        colors[p] = Math.min(color.r, 1);
        colors[p + 1] = Math.min(color.g, 1);
        colors[p + 2] = Math.min(color.b, 1);
        seeds[i] = Math.random();
      };

      // An open book made from two gently curved particle surfaces.
      const bookCount = Math.floor(COUNT * .64);
      for (let i = 0; i < bookCount; i++) {
        const side = i % 2 ? 1 : -1;
        const u = Math.random();
        const v = Math.random();
        const x = side * (.05 + u * 1.48);
        const y = (v - .5) * 2.05 - .15;
        const fold = Math.sin(u * Math.PI) * .16;
        const z = -.45 + fold - Math.abs(y + .15) * .025;
        const edge = u < .035 || u > .965 || v < .025 || v > .975;
        let tint = edge ? palette.cover : palette.paper;

        // Printed lines and bright vocabulary tabs remain readable in particles.
        const line = v > .23 && v < .76 && Math.floor(v * 12) % 2 === 0 &&
          u > .19 && u < .76;
        if (line && Math.random() < .62) tint = palette.ink;
        if (v > .82 && v < .9 && u > .52 && u < .78) {
          tint = side > 0 ? palette.pink : palette.cyan;
        }
        put(i, x + .45, y, z, tint, .8 + Math.random() * .2);
      }

      const letterPixels = [];
      const rasterLetter = letter => {
        const canvas = document.createElement('canvas');
        canvas.width = canvas.height = 96;
        const ctx = canvas.getContext('2d', { willReadFrequently: true });
        ctx.fillStyle = '#fff';
        ctx.font = '900 74px Inter, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(letter, 48, 52);
        const data = ctx.getImageData(0, 0, 96, 96).data;
        const pixels = [];
        for (let y = 0; y < 96; y += 2) {
          for (let x = 0; x < 96; x += 2) {
            if (data[(y * 96 + x) * 4 + 3] > 80) pixels.push([x, y]);
          }
        }
        return pixels;
      };
      ['A', 'B', 'C'].forEach(letter => letterPixels.push(rasterLetter(letter)));

      const cardCenters = [
        [-2.05, 1.55, -.1, palette.purple],
        [2.55, 1.4, -.25, palette.cyan],
        [2.35, -1.65, -.05, palette.pink]
      ];
      const cardStart = bookCount;
      const cardCount = Math.floor(COUNT * .3);
      for (let n = 0; n < cardCount; n++) {
        const card = n % 3;
        const [cx, cy, cz, tint] = cardCenters[card];
        const local = n % Math.floor(cardCount / 3);
        const borderParticle = local % 3 !== 0;
        let x;
        let y;
        let particleColor = tint;
        if (borderParticle) {
          const edge = Math.floor(Math.random() * 4);
          const along = Math.random() - .5;
          x = edge < 2 ? along * .9 : (edge === 2 ? -.45 : .45);
          y = edge >= 2 ? along * .9 : (edge === 0 ? -.45 : .45);
        } else {
          const pixels = letterPixels[card];
          const pixel = pixels[Math.floor(Math.random() * pixels.length)];
          x = (pixel[0] / 96 - .5) * .62;
          y = -(pixel[1] / 96 - .5) * .62;
          particleColor = palette.paper;
        }
        put(cardStart + n, cx + x, cy + y, cz + (Math.random() - .5) * .04,
          particleColor, .85 + Math.random() * .15);
      }

      // The remaining particles form punctuation-like satellites.
      for (let i = cardStart + cardCount; i < COUNT; i++) {
        const n = i - cardStart - cardCount;
        const orb = n % 3;
        const angle = Math.random() * Math.PI * 2;
        const radius = Math.sqrt(Math.random()) * (.1 + orb * .025);
        const centers = [[-2.7, -.65, -.7], [3.05, .15, -1], [-1.25, 2.15, -.8]];
        const center = centers[orb];
        put(i, center[0] + Math.cos(angle) * radius,
          center[1] + Math.sin(angle) * radius, center[2] + (Math.random() - .5) * .18,
          orb === 1 ? palette.cyan : palette.pink);
      }

      const geometry = new THREE.BufferGeometry();
      const positionAttribute = new THREE.BufferAttribute(positions, 3);
      positionAttribute.setUsage(THREE.DynamicDrawUsage);
      geometry.setAttribute('position', positionAttribute);
      geometry.setAttribute('aColor', new THREE.BufferAttribute(colors, 3));
      geometry.setAttribute('aSeed', new THREE.BufferAttribute(seeds, 1));

      const material = new THREE.ShaderMaterial({
        glslVersion: THREE.GLSL3,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        uniforms: {
          uTime: { value: 0 },
          uDpr: { value: Math.min(devicePixelRatio, 1.75) }
        },
        vertexShader: `
          in vec3 aColor;
          in float aSeed;
          out vec3 vColor;
          uniform float uTime;
          uniform float uDpr;
          void main() {
            vec3 p = position;
            float t = uTime + aSeed * 37.0;
            p += .008 * vec3(sin(t * 1.7), cos(t * 1.3), sin(t * 2.1));
            vec4 mv = modelViewMatrix * vec4(p, 1.0);
            gl_PointSize = clamp((2.1 + fract(aSeed * 9.17) * 1.7) * uDpr *
              (8.5 / max(-mv.z, .1)), 1.0, 12.0);
            vColor = aColor;
            gl_Position = projectionMatrix * mv;
          }`,
        fragmentShader: `
          precision highp float;
          in vec3 vColor;
          out vec4 outColor;
          void main() {
            vec2 c = gl_PointCoord - .5;
            float r2 = dot(c, c);
            if (r2 > .25) discard;
            float alpha = 1.0 - smoothstep(.12, .25, r2);
            outColor = vec4(vColor, alpha * .94);
          }`
      });

      const cloud = new THREE.Points(geometry, material);
      cloud.frustumCulled = false;
      scene.add(cloud);

      let pointerX = -9999;
      let pointerY = -9999;
      let pointerSpeed = 0;
      let lastPointerX = 0;
      let lastPointerY = 0;
      let lastPointerTime = 0;
      let scrollRotation = 0;
      const raycaster = new THREE.Raycaster();
      const ndc = new THREE.Vector2();

      addEventListener('pointermove', event => {
        const rect = mount.getBoundingClientRect();
        pointerX = event.clientX - rect.left;
        pointerY = event.clientY - rect.top;
        const now = performance.now();
        if (lastPointerTime) {
          const dt = Math.max((now - lastPointerTime) / 1000, .001);
          pointerSpeed += (Math.hypot(pointerX - lastPointerX, pointerY - lastPointerY) / dt - pointerSpeed) * .3;
        }
        lastPointerX = pointerX;
        lastPointerY = pointerY;
        lastPointerTime = now;
      }, { passive: true });
      document.documentElement.addEventListener('mouseleave', () => {
        pointerX = pointerY = -9999;
        pointerSpeed = 0;
      });
      addEventListener('scroll', () => { scrollRotation = scrollY * .0005; }, { passive: true });

      const simulate = delta => {
        const rect = mount.getBoundingClientRect();
        const active = pointerX >= 0 && pointerX <= rect.width && pointerY >= 0 && pointerY <= rect.height;
        const stiffness = 31;
        const push = 17 + Math.min(pointerSpeed / 120, 12);

        if (active) {
          ndc.set(pointerX / rect.width * 2 - 1, -(pointerY / rect.height) * 2 + 1);
          raycaster.setFromCamera(ndc, camera);
          const ray = raycaster.ray;
          const radius = .72;
          const radiusSq = radius * radius;
          const rayOrigin = ray.origin;
          const rayDir = ray.direction;

          // Spatial culling: project ray to particle Z plane, cull distant particles
          const planeZ = -1;
          const tPlane = (planeZ - rayOrigin.z) / rayDir.z;
          const rayPlaneX = rayOrigin.x + rayDir.x * tPlane;
          const rayPlaneY = rayOrigin.y + rayDir.y * tPlane;
          const cullRadius = radius + 1.5;
          const cullSq = cullRadius * cullRadius;

          for (let i = 0; i < COUNT; i++) {
            const p = i * 3;
            const dx = positions[p] - rayPlaneX;
            const dy = positions[p + 1] - rayPlaneY;
            let fx = 0, fy = 0, fz = 0;

            if (dx * dx + dy * dy < cullSq) {
              const wx = positions[p] - rayOrigin.x;
              const wy = positions[p + 1] - rayOrigin.y;
              const wz = positions[p + 2] - rayOrigin.z;
              const t = Math.max(wx * rayDir.x + wy * rayDir.y + wz * rayDir.z, 0);
              const rx = wx - rayDir.x * t;
              const ry = wy - rayDir.y * t;
              const rz = wz - rayDir.z * t;
              const distanceSq = rx * rx + ry * ry + rz * rz;
              if (distanceSq < radiusSq) {
                const distance = Math.sqrt(distanceSq);
                const inverse = 1 / Math.max(distance, .001);
                const falloff = 1 - distance / radius;
                const force = falloff * falloff * push * delta;
                // Radial scatter plus a tangential curl produces the swirl.
                fx += (rx * inverse - ry * inverse * .7) * force;
                fy += (ry * inverse + rx * inverse * .7) * force;
                fz += rz * inverse * force + falloff * 2.2 * delta;
              }
            }

            // Direct interpolation towards home (no velocity/decay)
            positions[p] += (homes[p] - positions[p] + fx) * stiffness * delta;
            positions[p + 1] += (homes[p + 1] - positions[p + 1] + fy) * stiffness * delta;
            positions[p + 2] += (homes[p + 2] - positions[p + 2] + fz) * stiffness * delta;
          }
        } else {
          for (let i = 0; i < COUNT; i++) {
            const p = i * 3;
            positions[p] += (homes[p] - positions[p]) * stiffness * delta;
            positions[p + 1] += (homes[p + 1] - positions[p + 1]) * stiffness * delta;
            positions[p + 2] += (homes[p + 2] - positions[p + 2]) * stiffness * delta;
          }
        }
        positionAttribute.needsUpdate = true;
      };

      const resize = () => {
        const width = Math.max(mount.clientWidth, 1);
        const height = Math.max(mount.clientHeight, 1);
        renderer.setSize(width, height, false);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
      };
      new ResizeObserver(resize).observe(mount);
      resize();

      let previous = performance.now();
      let frame = 0;
      let simFrame = 0;
      let simDelta = 0;
      const render = now => {
        const delta = Math.min((now - previous) / 1000, 1 / 30);
        previous = now;
        simDelta += delta;
        simFrame++;
        material.uniforms.uTime.value = now / 1000;
        cloud.rotation.y += (scrollRotation - cloud.rotation.y) * .025;
        cloud.rotation.x = Math.sin(now * .00035) * .035;
        cloud.position.y = Math.sin(now * .00055) * .08;
        pointerSpeed *= Math.exp(-3 * delta);
        // Run simulation every 2 frames; skip if frame budget exceeded
        if (simFrame % 2 === 0 && delta < 0.025) {
          simulate(Math.min(simDelta, 0.05));
          simDelta = 0;
        }
        renderer.render(scene, camera);
        frame = requestAnimationFrame(render);
      };
      frame = requestAnimationFrame(render);

      document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
          cancelAnimationFrame(frame);
        } else {
          previous = performance.now();
          frame = requestAnimationFrame(render);
        }
      });
    })
    .catch(() => mount.classList.add('three-unavailable'));
}
