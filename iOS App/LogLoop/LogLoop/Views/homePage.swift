//
//  homePage.swift
//  LogLoop
//
//  Created by Karim Hassan on 10/29/21.
//

import SwiftUI

struct homePage: View {
    @State private var myPostsApiHandler = myPostsApi()
    @State private var myPostsList = [MyPostEntity]()
    var body: some View {
        NavigationView{
            
            VStack {
                HStack(alignment: .top, spacing: nil, content:  {
                    Text("Home").font(.largeTitle).fontWeight(.heavy)
                    Spacer()
                    NavigationLink {
                        AddPost()
                    } label: {
                        Image(systemName: "plus").font(.title)
                    }
                }).padding()
                Spacer()
                ScrollView{
                    LazyVStack {
                        ForEach(myPostsList, id: \.self) { post in
                            if(myPostsList.count>0){
                                logComponent(myPostInstance: post)}
                        }
                    }
                }
                Spacer()
            }.navigationBarTitle("Home").navigationBarHidden(true).onAppear{
                self.myPostsList = myPostsApiHandler.getMyPosts()
            }
        }
            
        
    }
}

struct homePage_Previews: PreviewProvider {
    static var previews: some View {
        homePage()
    }
}


