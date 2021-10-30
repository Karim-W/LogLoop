//
//  postDetails.swift
//  LogLoop
//
//  Created by Karim Hassan on 10/30/21.
//

import SwiftUI

struct postDetails: View {
    var postInstance:postEntity
    var body: some View {
        Group{
            VStack(alignment: .leading, spacing: nil){
                HStack(alignment: .top, spacing: nil){
                    Circle().frame(width: 60,height: 60)
                    VStack(alignment: .leading, spacing: nil)  {
                        Text(postInstance.title).font(.title3).fontWeight(.bold)
                        Text("Date: \(postInstance.createdAt)").font(Font.caption).foregroundColor(.gray)
                    }
                    Spacer()
                }.padding(.horizontal)
                Text("This is jus a dummy text to show how the test will be rendered on the application plus idk this seems so much fun to fail at lol.").font(.body).fontWeight(.light).padding(.horizontal)
                VStack {
                    Divider()
                    HStack(alignment: .center){
                        Spacer()
                        Image(systemName: "arrowshape.turn.up.left").font(.title3).padding(.all,4)
                        Spacer()
                        Image(systemName: "repeat").font(.title3).padding(.all,4)
                        Spacer()
                        Image(systemName: "star").font(.title3).padding(.all,4)
                        Spacer()
                    }
                    Divider()
                }.padding(.vertical)
                Spacer()
            }.padding(.vertical)
        }
    }
}

struct postDetails_Previews: PreviewProvider {
    static let PostIn = postEntity(id: "1", title: "Demo Title", content: "This is jus a dummy text to show how the test will be rendered on the application plus idk this seems so much fun to fail at lol.", createdAt: "Today", updatedAt: "Today", authorID: "me", author: nil)
    static var previews: some View {
        postDetails(postInstance: PostIn)
    }
}
