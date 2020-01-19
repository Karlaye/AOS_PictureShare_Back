package org.techforumist.google.oauth.web;

import java.security.Principal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.techforumist.google.oauth.model.User;
import org.techforumist.google.oauth.repository.UserRepository;


@RestController
public class UserRestController {
	@Autowired
	private UserRepository userRepository;
	@GetMapping("/error")
	public String erreur(Principal principal){
		return("/index.html");
	}

	@RequestMapping("/user")
	public Principal sayHello(Principal principal) {
		System.out.println(principal.getName());
		System.out.println(userRepository.findByName(principal.getName()));
		if(userRepository.findByName(principal.getName()) == null){
			User user = new User();
			user.setName(principal.getName());
			userRepository.save(user);
			System.out.println("done"+user);
		}
		return principal;
	}

	@RequestMapping("/test")
	public String test(Principal principal){
		return principal.getName();

	}
	@GetMapping("/user/{id}")
	@PreAuthorize("hasRole('USER')")
	public User getUserInfo(Principal principal,@PathVariable Long id){
		return userRepository.findOne(id);
	}
	@GetMapping("/user/id")
	@PreAuthorize("hasRole('USER')")
	public long getUserId(Principal principal){
		return userRepository.findByName(principal.getName()).getId();
	}


}
