package com.example.sweetshop.Controller;


import com.example.sweetshop.model.Users;
import com.example.sweetshop.payload.SignupRequestDTO;
import com.example.sweetshop.payload.SignupResponseDTO;
import com.example.sweetshop.security.JwtUtil;
import com.example.sweetshop.service.UserService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserService userService;

    @PostMapping("/login")
    public String login(@RequestBody LoginRequest request) {

        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.username(), request.password()
                )
        );

        Users user = userService.getUserByUsername(request.username());

        return jwtUtil.generateToken(
                user.getUserName(),
                user.getRole().name()
        );
    }

    public record LoginRequest(
            @NotBlank String username,
            @NotBlank String password
    ) {}

    @PostMapping("/signup")
    public ResponseEntity<SignupResponseDTO> signup(
            @Valid @RequestBody SignupRequestDTO requestDTO) {

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(userService.registerUser(requestDTO));
    }
}
