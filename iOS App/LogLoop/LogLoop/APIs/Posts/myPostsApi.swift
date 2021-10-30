//
//  myPosts.swift
//  LogLoop
//
//  Created by Karim Hassan on 10/29/21.
//

import Foundation

class myPostsApi:ApiBase{
    let defaults = UserDefaults.standard
    var myPosts = [MyPostEntity]()
    override init() {
        super.init()
    }
    
    public func getMyPosts()->[MyPostEntity] {
        var semaphore = DispatchSemaphore (value: 0)
        var request = URLRequest(url: URL(string: self.API_BASE_URL+"/MyPosts")!,timeoutInterval: Double.infinity)
        request.addValue(defaults.string(forKey: "accessToken")!, forHTTPHeaderField: "Authorization")
        request.addValue("application/json", forHTTPHeaderField: "Content-Type")
        
        request.httpMethod = "GET"
        
        let task = URLSession.shared.dataTask(with: request) {
            data, _ , error in
            guard let data = data,error == nil else {
                semaphore.signal()
                return
            }
            do{
                let posts = try JSONDecoder().decode([MyPostEntity].self, from: data)
                    self.myPosts = posts
                    semaphore.signal()
            }catch{
                print(error)
            }
            
        }
        task.resume()
        semaphore.wait()
        return myPosts
    }
    
}

