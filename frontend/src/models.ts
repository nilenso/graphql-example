export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Organization = {
  __typename?: 'Organization';
  name: Scalars['String'];
  uuid: Scalars['ID'];
  workspaces: Array<Maybe<Workspace>>;
};

export type Query = {
  __typename?: 'Query';
  workspace?: Maybe<Workspace>;
};


export type QueryWorkspaceArgs = {
  uuid: Scalars['ID'];
};

export type User = {
  __typename?: 'User';
  name: Scalars['String'];
  organization: Organization;
  uuid: Scalars['ID'];
  workspaces: Array<Maybe<Workspace>>;
};

export type Workspace = {
  __typename?: 'Workspace';
  organization: Organization;
  slug: Scalars['String'];
  uuid: Scalars['ID'];
};
