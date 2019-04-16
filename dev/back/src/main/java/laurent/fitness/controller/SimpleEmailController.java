package laurent.fitness.controller;

import javax.mail.internet.MimeMessage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import laurent.fitness.services.UserService;
 
@RestController
@RequestMapping("/emailctrl")
@CrossOrigin("http://localhost:4200")
public class SimpleEmailController {
     
    @Autowired
    private JavaMailSender sender;
    
    private UserService userService;
    
    public SimpleEmailController (UserService userService) {
    	this.userService = userService;
    }
 
    @PostMapping("/payedcommand/{idCommand}/{totalPrice}/{username}")
    public ResponseEntity<?> sendEmailAfterPaypal(@PathVariable Integer idCommand, @PathVariable Float totalPrice, @PathVariable String username) {
        try {
        	
            //sendEmail(idCommand, totalPrice, username, this.userService.getEmailByUsername(username));
            sendEmail(idCommand, totalPrice, username, "lolo.picard@laposte.net");
            return ResponseEntity.status(HttpStatus.OK).body(null);
           // return ResponseEntity.status(HttpStatus.OK).body(this.userService.getEmailByUsername(username));
        }catch(Exception ex) {
        	System.out.println(ex);
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
 
    private void sendEmail(int idCommand, float amount, String username, String email) throws Exception{
        MimeMessage message = sender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message);
         
        
        helper.setTo("lolo.picard@laposte.net");
        
        helper.setText("Bonjour " + username + ",\n\nL'équipe de Smart Fitness vous accuse réception de la commande n°" + idCommand + 
        		" pour un montant de " + amount + "€.\nNous vous remercions de votre confiance et nous nous félicitons de vous revoir dans notre centre !\n\nL'équipe de Smart Fitness");
        helper.setSubject("Votre commande n°" + idCommand);
         
        sender.send(message);
    }
}
