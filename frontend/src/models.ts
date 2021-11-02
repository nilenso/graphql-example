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
  id: Scalars['ID'];
  name: Scalars['String'];
  workspaces: Array<Maybe<Workspace>>;
};

export type Query = {
  __typename?: 'Query';
  workspace?: Maybe<Workspace>;
};


export type QueryWorkspaceArgs = {
  id: Scalars['ID'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  name: Scalars['String'];
  organization: Organization;
  workspaces: Array<Maybe<Workspace>>;
};

export type Workspace = {
  __typename?: 'Workspace';
  id: Scalars['ID'];
  organization: Organization;
  slug: Scalars['String'];
};
