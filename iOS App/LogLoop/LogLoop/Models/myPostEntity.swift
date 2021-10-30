//
//  myPostEntity.swift
//  LogLoop
//
//  Created by Karim Hassan on 10/29/21.
//

import Foundation

// MARK: - MyPostEntity
struct MyPostEntity: Hashable,Codable {
    let id, title, content, createdAt: String
    let updatedAt: String
}
