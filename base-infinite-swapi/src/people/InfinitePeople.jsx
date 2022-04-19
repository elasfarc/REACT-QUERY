import InfiniteScroll from "react-infinite-scroller";
import { Person } from "./Person";
import { useInfiniteQuery } from "react-query";

const initialUrl = `https://swapi.dev/api/people/?page=`;
const fetchUrl = async (pageN) => {
  const response = await fetch(`${initialUrl}${pageN}`);
  return response.json();
};

export function InfinitePeople() {
  const { data, fetchNextPage, hasNextPage, isLoading, isFetchingNextPage } =
    useInfiniteQuery("sw-persons", ({ pageParam = 1 }) => fetchUrl(pageParam), {
      getNextPageParam: (lastPage, allPages) => {
        return allPages.length < Math.ceil(82 / 10)
          ? allPages.length + 1
          : null;
      },
    });
  if (isLoading) return <div className="loading">Loading...</div>;
  return (
    <InfiniteScroll loadMore={fetchNextPage} hasMore={hasNextPage}>
      {isFetchingNextPage ? <div className="loading">Loading...</div> : null}
      {data.pages.map((pageData) => {
        return pageData.results.map((person) => (
          <Person
            key={person.name}
            name={person.name}
            hairColor={person.hair_color}
            eyeColor={person.eye_color}
          ></Person>
        ));
      })}
    </InfiniteScroll>
  );
}
