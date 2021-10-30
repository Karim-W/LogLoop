//
//  authApi.swift
//  LogLoop
//
//  Created by Karim Hassan on 10/29/21.
//

import Foundation


class AuthApi:ApiBase {
    let defaults = UserDefaults.standard
    var AuthToken = ""
    override init() {
        super.init()
    }
    public func Signin(userEmail:String,userPass:String) -> Bool
    {
        
        do{
            let parameters = "{\n    \"email\":\"karim.wael@gmail.com\",\n    \"pass\":\"pass\"\n}"
            let postData = parameters.data(using: .utf8)

            var request = URLRequest(url: URL(string: "https://localhost:5001/api/user/login")!,timeoutInterval: Double.infinity)
            request.addValue("application/json", forHTTPHeaderField: "Content-Type")

            request.httpMethod = "POST"
            request.httpBody = postData

            let task = URLSession.shared.dataTask(with: request) { data, response, error in
              guard let data = data else {
                print(String(describing: error))
                  return
              }
              print(String(data: data, encoding: .utf8)!)
            }

            task.resume()
        }catch{
            return false
        }
        return false
        
        
        
    }
}






