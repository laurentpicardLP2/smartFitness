package laurent.fitness.controller;

import javax.mail.internet.MimeMessage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import laurent.fitness.model.Command;
import laurent.fitness.services.CommandService;
import laurent.fitness.services.UserService;
 
@RestController
@RequestMapping("/emailctrl")
@CrossOrigin("http://localhost:4200")
public class SimpleEmailController {
     
    @Autowired
    private JavaMailSender sender;
    
    private UserService userService;
    private CommandService commandService;
    
    public SimpleEmailController (UserService userService, CommandService commandService) {
    	this.userService = userService;
    	this.commandService = commandService;
    }
 
    @PostMapping("/payedcommand/{idCommand}/{amountFormatted}/{username}")
    public ResponseEntity<?> sendEmailAfterPaypal(@PathVariable Integer idCommand, @PathVariable String amountFormatted, @PathVariable String username) {
        try {
            
            sendEmailPaypal(idCommand, amountFormatted, this.userService.getFullnameByUsername(username), this.userService.getEmailByUsername(username));
            Command command = this.commandService.findByIdCommand(idCommand);
            command.setStatusCommand(3);
            this.commandService.saveCommand(command);
            return ResponseEntity.status(HttpStatus.OK).body(null);
        }catch(Exception ex) {
        	System.out.println(ex);
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
 
    private void sendEmailPaypal(int idCommand, String amountFormatted, String fullname, String email) throws Exception{
        MimeMessage message = sender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message);
         
        
        helper.setTo(email);
        
        helper.setText("Bonjour " + fullname + ",\n\nL'équipe de Smart Fitness vous accuse réception de la commande n°" + idCommand + 
        		" pour un montant de " + amountFormatted + ".\nNous vous remercions de votre confiance et nous nous félicitons de vous revoir prochainement dans notre centre !\n\nL'équipe Smart Fitness");
        helper.setSubject("Votre commande n°" + idCommand);
         
        sender.send(message);
    }
    
    @PostMapping("/signupconfirm/{username}")
    public ResponseEntity<?> sendEmailAfterSignup(@PathVariable String username) {
        try {         
            sendEmailSignup(this.userService.getFullnameByUsername(username), this.userService.getEmailByUsername(username));
            return ResponseEntity.status(HttpStatus.OK).body(null);
        }catch(Exception ex) {
        	System.out.println(ex);
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
    
    private void sendEmailSignup(String fullname, String email) throws Exception{
        MimeMessage message = sender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message);
         
        
        helper.setTo(email);
        
        helper.setText("Bonjour " + fullname + ",\n\nL'équipe de Smart Fitness vous souhaite la bienvenue.\n"
        		+ "Nous vous remercions de votre confiance et nous nous félicitons de vous voir prochainement dans notre centre !\n\nL'équipe Smart Fitness");
        helper.setSubject("Bienvenue chez SmartFitness.");
         
        sender.send(message);
    }

}
