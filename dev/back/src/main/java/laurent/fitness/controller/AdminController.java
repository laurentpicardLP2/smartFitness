package laurent.fitness.controller;

import java.io.File;
import java.io.IOException;
import java.util.Date;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import laurent.fitness.model.Command;
import laurent.fitness.model.Customer;
import laurent.fitness.model.Facility;
import laurent.fitness.model.FacilityCategory;
import laurent.fitness.model.Room;
import laurent.fitness.services.FacilityCategoryService;
import laurent.fitness.services.FacilityService;
import laurent.fitness.services.RoomService;
import laurent.fitness.upload.FileInformation;
import laurent.fitness.upload.exception.UploadFileException;

@RestController
@RequestMapping("/adminctrl")
@CrossOrigin("http://localhost:4200")
public class AdminController {

}
