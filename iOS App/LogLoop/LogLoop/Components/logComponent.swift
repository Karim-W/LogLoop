//
//  logComponent.swift
//  LogLoop
//
//  Created by Karim Hassan on 10/29/21.
//

import SwiftUI

struct logComponent: View {
    var myPostInstance:MyPostEntity
    var body: some View {
        ZStack {
            VStack {
                HStack {
                    Text(myPostInstance.title).font(.title3).fontWeight(.semibold)
                    Spacer()
                }
                Text(myPostInstance.content).font(.body).fontWeight(.light).padding()
                HStack{
                    Spacer()
                    Text(myPostInstance.createdAt).font(.caption).foregroundColor(.gray)
                }
            }.padding().foregroundColor(.black)
        }.background(Color.init(red: 0.91, green: 0.85, blue: 0.99)).cornerRadius(12).padding()
    }
}

struct logComponent_Previews: PreviewProvider {
    static let p = MyPostEntity(id: "1", title: "title", content: "content", createdAt: "today", updatedAt: "tmr")
    static var previews: some View {
        logComponent(myPostInstance: p)
    }
}
