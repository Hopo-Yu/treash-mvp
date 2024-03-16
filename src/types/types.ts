export interface Node {
  NodeID: number;
  Title: string;
  Description: string;
}

export interface Tag {
  TagID: number;
  TagName: string;
}

export interface NodeTag {
  NodeID: number;
  TagID: number;
}

export interface FilePath {
  FilePathID: number;
  FileName: string;
  NodeID: number;
  Path: string;
}

export interface NodePosition {
  PositionID: number;
  NodeID: number;
  X: number;
  Y: number;
}