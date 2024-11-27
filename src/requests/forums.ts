import { z } from 'zod';
import { Forum, Topic, Post } from '../schemas/forum';
import {
  apiRequest,
  PaginatedOptions,
  BaseSearchOptions,
  PaginatedCollection,
} from './common';

// Forum responses.
const SingleForum = z.object({
  forum: Forum,
});

const ForumCollection = PaginatedCollection.extend({
  forums: z.array(Forum),
});
export type ForumCollection = z.infer<typeof ForumCollection>;

// Topic responses
const SingleTopic = z.object({
  topic: Topic,
});

const TopicCollection = PaginatedCollection.extend({
  topics: z.array(Topic),
});
export type TopicCollection = z.infer<typeof TopicCollection>;

// Topic requests
const TopicListOptions = PaginatedOptions;
export type TopicListOptions = z.infer<typeof TopicListOptions>;

// Post responses
const PostCollection = PaginatedCollection.extend({
  posts: z.array(Post),
});
export type PostCollection = z.infer<typeof PostCollection>;

const PostListOptions = PaginatedOptions;
export type PostListOptions = z.infer<typeof PostListOptions>;

const PostSearchOptions = BaseSearchOptions;
export type PostSearchOptions = z.infer<typeof PostSearchOptions>;

/**
 * Get a list of all the Forums.
 * @param baseUrl Base API URL.
 * @returns Array of all Forums.
 */
export async function getForums(baseUrl: string): Promise<ForumCollection> {
  const response = await apiRequest(`${baseUrl}/forums`, ForumCollection);

  return response;
}

/**
 * Get a single Forum by its short name.
 * @param baseUrl Base API URL.
 * @param shortName Short name of the requested Forum.
 * @returns The requested Forum.
 */
export async function getForum(
  baseUrl: string,
  shortName: string,
): Promise<Forum> {
  const response = await apiRequest(
    `${baseUrl}/forums/${shortName}`,
    SingleForum,
  );

  return response.forum;
}

/**
 * Get all the Topics in a given Forum.
 * @param baseUrl Base API URL.
 * @param shortName Short name of the Forum.
 * @param options TopicListOptions representing the options for the query.
 * @returns Array of Topics in the Forum.
 */
export async function getForumTopics(
  baseUrl: string,
  shortName: string,
  options?: TopicListOptions,
): Promise<TopicCollection> {
  const response = await apiRequest(
    `${baseUrl}/forums/${shortName}/topics`,
    TopicCollection,
    options,
  );

  return response;
}

/**
 * Get a single Topic in the given Forum.
 *
 * @param baseUrl Base API URL.
 * @param forumShortName Short name of the Forum.
 * @param topicSlug Slug of the requested Topic.
 * @returns The requested Topic.
 */
export async function getForumTopic(
  baseUrl: string,
  forumShortName: string,
  topicSlug: string,
): Promise<Topic> {
  const response = await apiRequest(
    `${baseUrl}/forums/${forumShortName}/topics/${topicSlug}`,
    SingleTopic,
  );

  return response.topic;
}

/**
 * Get all of the Posts in a given Forum Topic.
 *
 * @param baseUrl Base API URL.
 * @param forumShortName Short name of the Forum.
 * @param topicSlug Slug of the Topic.
 * @returns Array of Posts in the given Forum Topic.
 */
export async function getForumTopicPosts(
  baseUrl: string,
  forumShortName: string,
  topicSlug: string,
  options?: PostListOptions,
): Promise<PostCollection> {
  const response = await apiRequest(
    `${baseUrl}/forums/${forumShortName}/topics/${topicSlug}/posts`,
    PostCollection,
    options,
  );

  return response;
}

/**
 * Executes the forum post search query defined by the {@code options}, and
 * returns the results.
 *
 * @param baseUrl Base API url.
 * @param options PostSearchOptions describing the search options.
 * @returns Array of search results.
 */
export async function searchPosts(
  baseUrl: string,
  options: PostSearchOptions,
): Promise<PostCollection> {
  const response = await apiRequest(
    `${baseUrl}/search/posts`,
    PostCollection,
    await PostSearchOptions.parseAsync(options),
  );

  return response;
}
