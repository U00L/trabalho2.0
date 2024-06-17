package com.example.demo.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/Listagem")
public class ProjetoListagemController {

    @RequestMapping("/Listagem")
    public String ProjetoListagem(){
        return "ListagemOcorrencia";
    }        
    }
    
