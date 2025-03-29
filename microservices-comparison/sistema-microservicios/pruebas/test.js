import http from 'k6/http';
import { check, sleep } from 'k6';

export default function () {
  let resOrdenes = http.get('http://localhost:3003/ordenes');
  check(resOrdenes, { 'Ordenes status 200': (r) => r.status == 200 });

  let resProductos = http.get('http://localhost:3002/productos');
  check(resProductos, { 'Productos status 200': (r) => r.status == 200 });

  let resUsuarios = http.get('http://localhost:3001/usuarios');
  check(resUsuarios, { 'Usuarios status 200': (r) => r.status == 200 });

  sleep(1);
}
