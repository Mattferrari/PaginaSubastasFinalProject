import unittest
import threading
import requests
from http.server import HTTPServer
from servidor import SimpleHTTPRequestHandler  

class TestSimpleHTTPServer(unittest.TestCase):

    @classmethod
    def setUpClass(cls):
        # Configura el servidor en un hilo separado
        cls.server_address = ('localhost', 8000)
        cls.httpd = HTTPServer(cls.server_address, SimpleHTTPRequestHandler)
        cls.server_thread = threading.Thread(target=cls.httpd.serve_forever)
        cls.server_thread.daemon = True  # Permite detener el hilo cuando las pruebas terminen
        cls.server_thread.start()

    @classmethod
    def tearDownClass(cls):
        # Detiene el servidor después de las pruebas
        cls.httpd.shutdown()
        cls.httpd.server_close()
        cls.server_thread.join()

    def test_get_request(self):
        # Realiza una solicitud GET al servidor
        response = requests.get(f'http://{self.server_address[0]}:{self.server_address[1]}')

        # Verifica que el servidor responde con un código de estado 200
        self.assertEqual(response.status_code, 200)

        # Verifica que el contenido sea de tipo HTML
        self.assertIn("text/html", response.headers['Content-Type'])

        # Verifica que el contenido HTML esperado esté en la respuesta
        self.assertIn("<h1>Hola desde un servidor Python</h1>", response.text)
        self.assertIn("<p>Este es un servidor simple que responde a solicitudes GET.</p>", response.text)
        self.assertIn("<img src='https://www.bing.com/images/search?view=detailV2&ccid=BWSttsVT&id=522EBBD2EAA19AE6937345446995C0DB8AB7B96B&thid=OIP.BWSttsVTNtcZucm62WBm-gHaE6&mediaurl=https%3a%2f%2fwww.nationalgeographic.com.es%2fmedio%2f2022%2f09%2f21%2fistock-1356246190_37d5212c_2000x1328.jpg&cdnurl=https%3a%2f%2fth.bing.com%2fth%2fid%2fR.0564adb6c55336d719b9c9bad96066fa%3frik%3da7m3itvAlWlERQ%26pid%3dImgRaw%26r%3d0&exph=1328&expw=2000&q=lince&simid=608031125148140297&FORM=IRPRST&ck=6391AAF815AED292585E925ADA90289B&selectedIndex=6&itb=0&ajaxhist=0&ajaxserp=0'>", response.text)
        self.assertIn("<p>Web del sAPIens.</p>", response.text)

if __name__ == '__main__':
    unittest.main()
