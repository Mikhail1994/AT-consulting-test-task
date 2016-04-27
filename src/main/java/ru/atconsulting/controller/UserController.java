package ru.atconsulting.controller;



import net.minidev.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import org.springframework.http.ResponseEntity;
import ru.atconsulting.db.dao.UserJdbcTemplate;
import ru.atconsulting.db.model.User;

import java.util.ArrayList;
import java.util.List;


@RestController
public class UserController {

    @Autowired
    private UserJdbcTemplate userDao;

    @RequestMapping(value = "/returnBook", method = RequestMethod.POST)
    public ResponseEntity returnBook() {
        return new ResponseEntity(HttpStatus.OK);
    }


    @RequestMapping(value = "/users", method = RequestMethod.GET)
    public ResponseEntity<List<JSONObject>> loadUsers() {
        List<JSONObject> entities = new ArrayList<JSONObject>();
        List<User> users = userDao.getAllUsers();

        for (User u : users) {
            JSONObject entity = new JSONObject();
            entity.put("name", u.getName());
            entity.put("surname", u.getSurname());
            entities.add(entity);
        }

        return new ResponseEntity<List<JSONObject>>(entities, HttpStatus.OK);
    }


    @RequestMapping(value = "/addUser", method = RequestMethod.POST)
    public  ResponseEntity addUser(@RequestParam(value = "login") String login, @RequestParam(value = "password") String password){

        try{
            userDao.addUser(login,password);
        }catch(Exception ex){
            int t= 9;
        }
        return null;
    }
}
