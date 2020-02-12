package main

import (
	"net/http"
)

func main(){
	http.Handle("/", http.FileServer(http.Dir(".")))
	http.Handle("/public/", http.StripPrefix("/public", http.FileServer(http.Dir("assets"))))
	server:= http.Server{
		Addr: ":8080",
		Handler: nil,
	}
	server.ListenAndServe()
}