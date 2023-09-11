import { useQuery } from '@tanstack/react-query';
import BoardInside from './BoardInside';

export default function Board() {
  // const { isLoading, isError, data, error } = useQuery({
  //   queryKey: ['currBoard'],
  //   queryFn: async () => {
  //     const res = await fetch(
  //       '/api/boards/cc529ae3-d1d2-4297-8eed-74b9c8e71070'
  //     );
  //     const data = await res.json();

  //     return data;
  //   },
  // });

  // if (isLoading) return <p>Loading...</p>;

  // if (isError) return <p>error.message</p>;

  // return <BoardInside board={data.board} />;
  return <BoardInside />;
}
