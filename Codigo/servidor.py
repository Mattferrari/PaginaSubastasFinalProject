from http.server import BaseHTTPRequestHandler, HTTPServer

# Define el manejador de las solicitudes HTTP
class SimpleHTTPRequestHandler(BaseHTTPRequestHandler):
    def do_GET(self):
        # Define la respuesta HTTP
        self.send_response(200)  # Código 200 significa que la solicitud fue exitosa
        self.send_header("Content-type", "text/html")
        self.end_headers()

        # Contenido HTML que queremos devolver
        html_content = """<!DOCTYPE html>
        <html lang='en'>
        <head>
            <meta charset='UTF-8'>
            <meta name='viewport' content='width=device-width, initial-scale=1.0'>
            <title>Servidor Python</title>
        </head>
        <body>
            <h1>Hola desde un servidor Python</h1>
            <p>Este es un servidor simple que responde a solicitudes GET.</p>
            <img src='https://www.bing.com/images/search?view=detailV2&ccid=BWSttsVT&id=522EBBD2EAA19AE6937345446995C0DB8AB7B96B&thid=OIP.BWSttsVTNtcZucm62WBm-gHaE6&mediaurl=https%3a%2f%2fwww.nationalgeographic.com.es%2fmedio%2f2022%2f09%2f21%2fistock-1356246190_37d5212c_2000x1328.jpg&cdnurl=https%3a%2f%2fth.bing.com%2fth%2fid%2fR.0564adb6c55336d719b9c9bad96066fa%3frik%3da7m3itvAlWlERQ%26pid%3dImgRaw%26r%3d0&exph=1328&expw=2000&q=lince&simid=608031125148140297&FORM=IRPRST&ck=6391AAF815AED292585E925ADA90289B&selectedIndex=6&itb=0&ajaxhist=0&ajaxserp=0'> 

        </body>
        </html>"""

        # Escribir el contenido HTML en la respuesta
        self.wfile.write(html_content.encode("utf-8"))

# Configura el servidor
if __name__ == "__main__":
    # Define la dirección y el puerto
    server_address = ("", 8000)  # Escucha en todas las interfaces en el puerto 8000
    httpd = HTTPServer(server_address, SimpleHTTPRequestHandler)

    print("Servidor corriendo en el puerto 8000...")
    try:
        httpd.serve_forever()  # Mantiene el servidor ejecutándose
    except KeyboardInterrupt:
        print("\nServidor detenido.")
        httpd.server_close()
