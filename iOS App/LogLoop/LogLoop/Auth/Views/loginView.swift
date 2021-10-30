//
//  loginView.swift
//  LogLoop
//
//  Created by Karim Hassan on 10/27/21.
//

import SwiftUI


struct loginView: View {
    @State private var userEmail:String=""
    @State private var userPass:String=""
    @State private var authApiHandler = AuthApi()
    @State private var showToast = false

    var body: some View {
        		
        NavigationView{
            VStack(
                alignment: /*@START_MENU_TOKEN@*/.center/*@END_MENU_TOKEN@*/, spacing: 10, content: {
                    Text("logLoop").font(.title)
                    Spacer()
                    HStack {
                        Group {
                            VStack(alignment: .leading, spacing: nil, content: {
                                Text("email:").font(.title2)
                                Text("password:").font(.title2)
                            }).padding()
                            VStack(alignment: .leading, spacing: /*@START_MENU_TOKEN@*/nil/*@END_MENU_TOKEN@*/, content: {
                                TextField("email", text: $userEmail).font(.title2)
                                SecureField("password", text: $userPass).font(.title2)
                            })
                        }
                    }.padding()
                    Spacer()
//                    Button(action:) {
//                        Text("Login")
//                    }
                    Button(action: {
                        authApiHandler.Signin(userEmail: userEmail, userPass: userPass)
                    }) {
                        Text("Press Button")
                    }
                    Spacer()
                    NavigationLink(destination: registerView()) {
                        Text("Don't Have an account?\nClick here to register").multilineTextAlignment(.center)
                    }
                    Spacer()
                    
                })
            Spacer()
            
        }
        
    }
    
    
}

struct loginView_Previews: PreviewProvider {
    static var previews: some View {
        loginView()
    }
}
