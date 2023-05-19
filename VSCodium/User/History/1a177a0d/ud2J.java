import java.time.LocalDate;

public class Inventario implements Tienda_de_tenis{
    String rojo = "\033[31m";
    String reset = "\u001B[0m";

    private Productos[] producto = {
        new Productos ("Nike", 1, 4500,LocalDate.of(2023,06,30)),
        new Productos("Adidas", 1, 5000,LocalDate.of(2023,11,26)),
        new Productos("Puma", 1, 3000,LocalDate.of(2023,06,30)),
        new Productos("New Balance", 1, 4500,LocalDate.of(2023,12,4)),
        new Productos("Reebok", 1, 3500,LocalDate.of(2023,05,4)),
        new Productos("Converse", 1, 2000,LocalDate.of(2023,02,3)),
        new Productos("Vans", 1, 2500,LocalDate.of(2023,04,12)),
        new Productos("Asics", 1, 5000,LocalDate.of(2023,07,4)),
        new Productos("Fila", 1, 1999,LocalDate.of(2023,03,10)),
        new Productos("Skechers", 1, 2500,LocalDate.of(2023,06,1)),
        
    };

   


  

    public void consulta_producto(){

        System.out.println("\n----------------------------------------------------------------------------");
        System.out.println("|                      LISTA DE LOS PRODUCTOS DISPONIBLES                  |");
        System.out.println("----------------------------------------------------------------------------");
        for (int i = 0; i < producto.length; i++){
            System.out.println((i +1)+ ") " + producto[i].getNombre());
        }
    }
    public void mostrar_producto(int indice){
        if (indice < 1 || indice >  producto.length){
            System.out.println(rojo+"\n\n PRODUCTO NO DISPONIBLE "+reset); 
            return;
        }
        
        Productos p = producto[indice - 1];
        

        System.out.println("\n\nNombre : " + p.getNombre());
        System.out.println("Cantidad   : " + p.getCantidad());
        System.out.println("Precio     : " + p.getPrecio());
        System.out.println("Fecha de creacin  : " + p.getCaducidad());
        System.out.println("\nPRODUCTO VENDIDO  : "+p.getNombre());
        System.out.println("EL TOTAL ES       : "+p.getPrecio());
       
    }
    
}
