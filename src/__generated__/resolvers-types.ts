import { GraphQLResolveInfo } from 'graphql';
import { MyContext } from '../app';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Book = {
  id: Scalars['ID']['output'];
  name?: Maybe<Scalars['String']['output']>;
  publisher: Publisher;
  title: Scalars['String']['output'];
};

export type ColorBook = Book & {
  __typename?: 'ColorBook';
  colors?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  id: Scalars['ID']['output'];
  name?: Maybe<Scalars['String']['output']>;
  publisher: Publisher;
  title: Scalars['String']['output'];
};

export type CreateBookInput = {
  colors?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  id: Scalars['ID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  publisher_id: Scalars['ID']['input'];
  subject?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  title: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  changeReadStatus: ReadStatus;
  createBookByPublisher: Result;
};


export type MutationChangeReadStatusArgs = {
  userReadInput?: InputMaybe<ReadStatusInput>;
};


export type MutationCreateBookByPublisherArgs = {
  createBookInput?: InputMaybe<CreateBookInput>;
};

export type Publisher = {
  __typename?: 'Publisher';
  books?: Maybe<Array<Result>>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
  books?: Maybe<Array<Result>>;
  getBook?: Maybe<Result>;
  getMyReading?: Maybe<Array<ReadStatus>>;
  getPublisher: Publisher;
};


export type QueryGetBookArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetPublisherArgs = {
  id: Scalars['ID']['input'];
};

export type ReadStatus = {
  __typename?: 'ReadStatus';
  NB?: Maybe<Scalars['String']['output']>;
  book: Result;
  id: Scalars['ID']['output'];
  readStatus?: Maybe<Status>;
};

export type ReadStatusInput = {
  id: Scalars['ID']['input'];
  readStatus: Status;
};

export type Result = ColorBook | TextBook;

export enum Status {
  Done = 'DONE',
  InProgress = 'IN_PROGRESS',
  Todo = 'TODO'
}

export type Subscription = {
  __typename?: 'Subscription';
  bookFeed?: Maybe<Result>;
};


export type SubscriptionBookFeedArgs = {
  pub_id: Scalars['ID']['input'];
};

export type TextBook = Book & {
  __typename?: 'TextBook';
  id: Scalars['ID']['output'];
  name?: Maybe<Scalars['String']['output']>;
  publisher: Publisher;
  subject?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  title: Scalars['String']['output'];
};

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping of union types */
export type ResolversUnionTypes<RefType extends Record<string, unknown>> = ResolversObject<{
  Result: ( ColorBook ) | ( TextBook );
}>;

/** Mapping of interface types */
export type ResolversInterfaceTypes<RefType extends Record<string, unknown>> = ResolversObject<{
  Book: ( ColorBook ) | ( TextBook );
}>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  Book: ResolverTypeWrapper<ResolversInterfaceTypes<ResolversTypes>['Book']>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  ColorBook: ResolverTypeWrapper<ColorBook>;
  CreateBookInput: CreateBookInput;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Mutation: ResolverTypeWrapper<{}>;
  Publisher: ResolverTypeWrapper<Omit<Publisher, 'books'> & { books?: Maybe<Array<ResolversTypes['Result']>> }>;
  Query: ResolverTypeWrapper<{}>;
  ReadStatus: ResolverTypeWrapper<Omit<ReadStatus, 'book'> & { book: ResolversTypes['Result'] }>;
  ReadStatusInput: ReadStatusInput;
  Result: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['Result']>;
  Status: Status;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  Subscription: ResolverTypeWrapper<{}>;
  TextBook: ResolverTypeWrapper<TextBook>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Book: ResolversInterfaceTypes<ResolversParentTypes>['Book'];
  Boolean: Scalars['Boolean']['output'];
  ColorBook: ColorBook;
  CreateBookInput: CreateBookInput;
  ID: Scalars['ID']['output'];
  Mutation: {};
  Publisher: Omit<Publisher, 'books'> & { books?: Maybe<Array<ResolversParentTypes['Result']>> };
  Query: {};
  ReadStatus: Omit<ReadStatus, 'book'> & { book: ResolversParentTypes['Result'] };
  ReadStatusInput: ReadStatusInput;
  Result: ResolversUnionTypes<ResolversParentTypes>['Result'];
  String: Scalars['String']['output'];
  Subscription: {};
  TextBook: TextBook;
}>;

export type BookResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['Book'] = ResolversParentTypes['Book']> = ResolversObject<{
  __resolveType: TypeResolveFn<'ColorBook' | 'TextBook', ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  publisher?: Resolver<ResolversTypes['Publisher'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
}>;

export type ColorBookResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['ColorBook'] = ResolversParentTypes['ColorBook']> = ResolversObject<{
  colors?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  publisher?: Resolver<ResolversTypes['Publisher'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MutationResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  changeReadStatus?: Resolver<ResolversTypes['ReadStatus'], ParentType, ContextType, Partial<MutationChangeReadStatusArgs>>;
  createBookByPublisher?: Resolver<ResolversTypes['Result'], ParentType, ContextType, Partial<MutationCreateBookByPublisherArgs>>;
}>;

export type PublisherResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['Publisher'] = ResolversParentTypes['Publisher']> = ResolversObject<{
  books?: Resolver<Maybe<Array<ResolversTypes['Result']>>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type QueryResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  books?: Resolver<Maybe<Array<ResolversTypes['Result']>>, ParentType, ContextType>;
  getBook?: Resolver<Maybe<ResolversTypes['Result']>, ParentType, ContextType, RequireFields<QueryGetBookArgs, 'id'>>;
  getMyReading?: Resolver<Maybe<Array<ResolversTypes['ReadStatus']>>, ParentType, ContextType>;
  getPublisher?: Resolver<ResolversTypes['Publisher'], ParentType, ContextType, RequireFields<QueryGetPublisherArgs, 'id'>>;
}>;

export type ReadStatusResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['ReadStatus'] = ResolversParentTypes['ReadStatus']> = ResolversObject<{
  NB?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  book?: Resolver<ResolversTypes['Result'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  readStatus?: Resolver<Maybe<ResolversTypes['Status']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ResultResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['Result'] = ResolversParentTypes['Result']> = ResolversObject<{
  __resolveType: TypeResolveFn<'ColorBook' | 'TextBook', ParentType, ContextType>;
}>;

export type SubscriptionResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription']> = ResolversObject<{
  bookFeed?: SubscriptionResolver<Maybe<ResolversTypes['Result']>, "bookFeed", ParentType, ContextType, RequireFields<SubscriptionBookFeedArgs, 'pub_id'>>;
}>;

export type TextBookResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['TextBook'] = ResolversParentTypes['TextBook']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  publisher?: Resolver<ResolversTypes['Publisher'], ParentType, ContextType>;
  subject?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = MyContext> = ResolversObject<{
  Book?: BookResolvers<ContextType>;
  ColorBook?: ColorBookResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Publisher?: PublisherResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  ReadStatus?: ReadStatusResolvers<ContextType>;
  Result?: ResultResolvers<ContextType>;
  Subscription?: SubscriptionResolvers<ContextType>;
  TextBook?: TextBookResolvers<ContextType>;
}>;

