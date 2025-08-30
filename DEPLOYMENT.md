# 🚀 Guía de Despliegue - Radiesse Landing Page

Esta guía te ayudará a subir tu página de Radiesse a diferentes plataformas de hosting.

## 📦 Archivos Necesarios

Asegúrate de tener todos estos archivos antes del despliegue:

```
radiesse-landing/
├── index.html          ✅ Página principal (OBLIGATORIO)
├── styles.css          ✅ Estilos (OBLIGATORIO)
├── script.js           ✅ JavaScript (OBLIGATORIO)
├── .htaccess          ⚙️ Configuración Apache (opcional)
├── nginx.conf         ⚙️ Configuración Nginx (opcional)
├── README.md          📖 Documentación
└── DEPLOYMENT.md      📋 Esta guía
```

## 🌐 Opciones de Hosting

### 1. 📁 Hosting Tradicional (cPanel/FTP)

**Pasos:**

1. **Accede a tu cPanel o cliente FTP**
   - FileZilla, WinSCP, o el administrador de archivos de cPanel

2. **Navega a la carpeta pública**
   ```
   /public_html/          (para dominio principal)
   /public_html/radiesse/ (para subdirectorio)
   ```

3. **Sube los archivos**
   - Arrastra y suelta: `index.html`, `styles.css`, `script.js`
   - Si usas Apache: incluye `.htaccess`

4. **Verifica permisos**
   - Archivos: 644
   - Carpetas: 755

5. **Prueba tu sitio**
   - `https://tudominio.com/` (dominio principal)
   - `https://tudominio.com/radiesse/` (subdirectorio)

**Proveedores recomendados:**
- Hostinger
- SiteGround
- Bluehost
- GoDaddy

---

### 2. ⚡ Netlify (Recomendado - Gratuito)

**Método 1: Drag & Drop**

1. Ve a [netlify.com](https://netlify.com)
2. Crea una cuenta gratuita
3. Arrastra la carpeta con tus archivos al área de despliegue
4. ¡Listo! Obtienes una URL como `https://amazing-name-123456.netlify.app`

**Método 2: Git Deploy**

1. Sube tus archivos a GitHub
2. Conecta tu repositorio con Netlify
3. Configuración automática de despliegue

**Configuración adicional:**
```toml
# netlify.toml (opcional)
[build]
  publish = "."

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-XSS-Protection = "1; mode=block"
```

---

### 3. 🔥 Vercel (Gratuito)

1. Ve a [vercel.com](https://vercel.com)
2. Conecta con GitHub/GitLab
3. Importa tu proyecto
4. Despliegue automático

**Configuración:**
```json
{
  "version": 2,
  "builds": [
    {
      "src": "index.html",
      "use": "@vercel/static"
    }
  ]
}
```

---

### 4. 📄 GitHub Pages (Gratuito)

1. **Sube archivos a GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/usuario/radiesse-landing.git
   git push -u origin main
   ```

2. **Habilita GitHub Pages**
   - Ve a Settings > Pages
   - Source: Deploy from a branch
   - Branch: main / (root)

3. **Tu sitio estará en:**
   `https://usuario.github.io/radiesse-landing/`

---

### 5. 🔧 Servidor VPS/Dedicado

#### Para Apache:

1. **Sube archivos via SSH**
   ```bash
   scp -r radiesse-landing/ usuario@servidor:/var/www/html/
   ```

2. **Configura Virtual Host**
   ```apache
   <VirtualHost *:80>
       ServerName radiesse.tudominio.com
       DocumentRoot /var/www/html/radiesse-landing
       ErrorLog ${APACHE_LOG_DIR}/radiesse_error.log
       CustomLog ${APACHE_LOG_DIR}/radiesse_access.log combined
   </VirtualHost>
   ```

3. **Habilita el sitio**
   ```bash
   sudo a2ensite radiesse.conf
   sudo systemctl reload apache2
   ```

#### Para Nginx:

1. **Copia la configuración**
   ```bash
   sudo cp nginx.conf /etc/nginx/sites-available/radiesse
   sudo ln -s /etc/nginx/sites-available/radiesse /etc/nginx/sites-enabled/
   ```

2. **Reinicia Nginx**
   ```bash
   sudo nginx -t
   sudo systemctl reload nginx
   ```

---

## 🔒 Configuración SSL (HTTPS)

### Let's Encrypt (Gratuito)

```bash
# Para Apache
sudo certbot --apache -d tudominio.com

# Para Nginx  
sudo certbot --nginx -d tudominio.com
```

### Cloudflare (Recomendado)

1. Registra tu dominio en Cloudflare
2. Cambia los nameservers
3. SSL automático + CDN gratis

---

## 📊 Configuración de Analytics

### Google Analytics 4

Agrega antes del `</head>` en `index.html`:

```html
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

### Google Search Console

1. Ve a [search.google.com/search-console](https://search.google.com/search-console)
2. Agrega tu propiedad
3. Verifica la propiedad
4. Envía tu sitemap (opcional)

---

## 🎯 Optimización Post-Despliegue

### 1. Pruebas de Velocidad

- [PageSpeed Insights](https://pagespeed.web.dev/)
- [GTmetrix](https://gtmetrix.com/)
- [WebPageTest](https://www.webpagetest.org/)

### 2. Pruebas de Funcionalidad

**Checklist:**
- [ ] Página carga correctamente
- [ ] Todas las imágenes se muestran
- [ ] Botones de WhatsApp funcionan
- [ ] FAQ se expande/contrae
- [ ] Responsive en móvil/tablet
- [ ] Velocidad de carga < 3 segundos

### 3. SEO Básico

```html
<!-- Verificar que tengas estos meta tags -->
<meta name="description" content="...">
<meta name="keywords" content="radiesse, relleno dérmico, colágeno, clínica renové">
<meta property="og:title" content="Radiesse - Clínica Renové">
<meta property="og:description" content="...">
<meta property="og:image" content="URL_DE_IMAGEN">
```

---

## 🔧 Solución de Problemas

### Problema: Imágenes no cargan

**Solución:**
1. Verifica que las URLs sean correctas
2. Comprueba permisos de archivos (644)
3. Revisa la consola del navegador (F12)

### Problema: CSS/JS no se aplica

**Solución:**
1. Verifica rutas relativas en `index.html`
2. Limpia caché del navegador (Ctrl+F5)
3. Comprueba sintaxis de archivos

### Problema: WhatsApp no funciona

**Solución:**
1. Verifica el número de teléfono
2. Comprueba codificación URL del mensaje
3. Prueba en diferentes dispositivos

### Problema: Sitio lento

**Solución:**
1. Optimiza imágenes (WebP, compresión)
2. Habilita compresión GZIP
3. Usa CDN (Cloudflare)
4. Minifica CSS/JS

---

## 📞 Soporte Técnico

Si necesitas ayuda con el despliegue:

- **WhatsApp**: +52 844 780 4399
- **Email**: Contacta a través de WhatsApp
- **Ubicaciones**: Monterrey • Saltillo • Monclova

---

## 📋 Checklist Final

Antes de considerar el despliegue completo:

- [ ] Todos los archivos subidos correctamente
- [ ] SSL configurado (HTTPS)
- [ ] Analytics instalado
- [ ] Pruebas en diferentes dispositivos
- [ ] Velocidad optimizada
- [ ] Backup de archivos realizado
- [ ] DNS configurado correctamente
- [ ] Funcionalidad de WhatsApp probada

---

**¡Felicidades! Tu página de Radiesse está lista para recibir pacientes 🎉**

*Última actualización: Enero 2025*
