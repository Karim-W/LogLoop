//
//  postEntity.swift
//  LogLoop
//
//  Created by Karim Hassan on 10/29/21.
//

import Foundation

// MARK: - Welcome
struct postEntity: Codable {
    let id, title, content, createdAt: String
    let updatedAt, authorID: String?
    let author: JSONNull?

    enum CodingKeys: String, CodingKey {
        case id, title, content, createdAt, updatedAt
        case authorID
        case author
    }
}

// MARK: - Encode/decode helpers

class JSONNull: Codable, Hashable {

    public static func == (lhs: JSONNull, rhs: JSONNull) -> Bool {
        return true
    }

    public var hashValue: Int {
        return 0
    }

    public init() {}

    public required init(from decoder: Decoder) throws {
        let container = try decoder.singleValueContainer()
        if !container.decodeNil() {
            throw DecodingError.typeMismatch(JSONNull.self, DecodingError.Context(codingPath: decoder.codingPath, debugDescription: "Wrong type for JSONNull"))
        }
    }

    public func encode(to encoder: Encoder) throws {
        var container = encoder.singleValueContainer()
        try container.encodeNil()
    }
}

