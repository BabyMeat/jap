import java.util.Map;
import java.util.Scanner;
import java.util.TreeMap;

public class Japanese {
    private static Map<String,String> vocabulary = new TreeMap<>();
    private static Map<String,String> reversed_vocabulary = new TreeMap<>();

    static{
        vocabulary.put("あたま", "tête");
    }

    private void typemachine(String text){
        for(int i = 0; i < text.length(); i++){
            System.out.print(text.charAt(i)); // Utilisation de print pour ne pas ajouter de saut de ligne à chaque caractère
            try{
                Thread.sleep(38); // Pause de 200 millisecondes entre chaque caractère
            } catch (InterruptedException e){
                e.printStackTrace(); // Affiche la trace de l'exception
            }
        }
        System.out.println(); // Ajout d'un saut de ligne à la fin du texte
    }
    

    public Japanese(){
        Scanner sc = new Scanner(System.in);
        typemachine("Salut, es-tu-prêt pour un nouveau entrainement de japonais ?");
        typemachine("(oui - non):");
        String input ="";
        while(input.compareToIgnoreCase("oui")!=0 && input.compareToIgnoreCase("non")!=0){
            input=sc.nextLine();
            if(input.compareToIgnoreCase("oui")!=0 && input.compareToIgnoreCase("non")!=0){
               typemachine("Je n'ai pas compris, veux tu entraîner ton japonais ?");
               typemachine("(oui - non):");
            }
            else if (input.compareToIgnoreCase("non")==0) {
                typemachine("Ça marche, à plus.");
                return;
            }
        }
        typemachine("C'est Partiiiii !!! :)");
    }

    public static void main(String[] args) {
        Japanese jap = new Japanese();
    }


}
