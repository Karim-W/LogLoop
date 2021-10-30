//
//  ContentView.swift
//  LogLoop
//
//  Created by Karim Hassan on 10/27/21.
//

import SwiftUI

struct ContentView: View {
    @State private var isAuthed = false
    let defaults = UserDefaults.standard
    func list(){
        print(UserDefaults.standard.dictionaryRepresentation())
    }
    var body: some View {
        if ((defaults.string(forKey: "accessToken")) != nil) {
            if(defaults.string(forKey: "accessToken") != "")
            {
                TabView(selection: /*@START_MENU_TOKEN@*//*@PLACEHOLDER=Selection@*/.constant(1)/*@END_MENU_TOKEN@*/) {
                    homePage().tabItem { Text("Tab Label 1") }.tag(1)
                    Text("Tab Content 2").tabItem { Text("Tab Label 2") }.tag(2)
                }
//                homePage()
                
            }else{
                loginView()
            }
        }else{
            loginView()
        }
        
    }
    
}

struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
        ContentView()
    }
}
