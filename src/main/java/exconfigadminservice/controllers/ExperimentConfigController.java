package exconfigadminservice.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
@RestController
public class ExperimentConfigController {
        @GetMapping("/hello")
        public String hello() {
            return "Hello, Brandon!";
        }


}
