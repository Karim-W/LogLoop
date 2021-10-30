//
//  registerView.swift
//  LogLoop
//
//  Created by Karim Hassan on 10/27/21.
//

import SwiftUI

struct registerView: View {
    @State private var userEmail=""
    @Environment(\.presentationMode) var mode: Binding<PresentationMode>
    var body: some View {

            VStack(alignment: .leading, content:  {
                HStack {
                    Text("register").font(.largeTitle).fontWeight(.black)
                    Spacer()
                }
                HStack(alignment: .center, spacing: nil, content: {
                    Spacer()
                    VStack {
                        Text("please enter your email to be added to the waitlist").multilineTextAlignment(.center)
                        TextField("enter your email", text: $userEmail).multilineTextAlignment(.center)
                        Button(action: /*@START_MENU_TOKEN@*/{}/*@END_MENU_TOKEN@*/, label: {
                            Text("Sign up")
                        }).padding(.top,20)
                    }
                    Spacer()
                }).padding(.top,40)
               
                    HStack {
                        Spacer()
                        Button(
                            action: { self.mode.wrappedValue.dismiss() }) {
                                Text("already have an account sign in by clicking here").fontWeight(.light).multilineTextAlignment(.center).padding(.top,40)
                            }
                        
                        Spacer()
                    }
                
                Spacer()
                
            }).padding()
            
        
        
    }
}

struct registerView_Previews: PreviewProvider {
    static var previews: some View {
        registerView()
    }
}
