package exconfigadminservice.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class ReactController {

    @RequestMapping("/")
    public String home() {
        return "index.html";
    }
}