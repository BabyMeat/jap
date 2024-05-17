import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Scanner;
import java.util.TreeMap;
import java.util.concurrent.ThreadLocalRandom;

public class Japanese {
    private static Map<String,String> vocabulary = new TreeMap<>();
    private static Map<String,String> reversed_vocabulary = new TreeMap<>();

    static{
        vocabulary.put("あたま", "tête");
        vocabulary.put("あたまtaguele","taguele");
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

    private List<Integer> training(int times){
        List<Integer> quiz = new ArrayList<>();
        for(int i=0;i<times;i++){
            quiz.add(ThreadLocalRandom.current().nextInt(0, vocabulary.size()+0));
        }
        return quiz;
    }
    

    public Japanese(){
        Scanner sc = new Scanner(System.in);
        typemachine("Salut, es-tu-prêt pour un nouveau entrainement de japonais ? :)))");
        typemachine("(oui - non):");
        String input ="";
        while(input.compareToIgnoreCase("oui")!=0 && input.compareToIgnoreCase("non")!=0){
            input=sc.nextLine();
            if(input.compareToIgnoreCase("oui")!=0 && input.compareToIgnoreCase("non")!=0){
               typemachine("Je n'ai pas compris, veux tu entraîner ton japonais ?");
               typemachine("(oui - non):");
            }
            else if (input.compareToIgnoreCase("non")==0) {
                typemachine("Ça marche, à plus. :C");
                return;
            }
        }
        typemachine("C'est Partiiiii !!! :D");
        typemachine("Combien de mots veux tu réviser ? :)))");
        int input2 = -1;
        while(input2<=0){
            input2=sc.nextInt();
            if(input2<=0){
                typemachine("Je n'ai pas compris, Combien de mots veux tu réviser ?");
            }
        }
        typemachine("Parfait, c'est partiiiii !!! :)))");
        int points = 0;
        List<Integer> quiz = training(input2);
        for(int i=0;i<quiz.size();i++){
            String answer = vocabulary.keySet().toArray()[i].toString();
            System.out.println(" REPONSE : " + answer);

            
            typemachine("Que veux dire le mot suivant : ");
            input = sc.nextLine();
            if(input.compareToIgnoreCase(vocabulary.get(vocabulary.keySet().toArray()[i]))==0){
                typemachine("bien :)");
                points=points+1;
            }
            else{
                typemachine("non :( c'était le mot " + answer);
            }
        }



    }

    public static void main(String[] args) {
        Japanese jap = new Japanese();
        // je veux tester 
    }


}
