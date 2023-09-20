import { useParams } from 'react-router-dom';
import Board from './Board';
import { useQueryClient } from '@tanstack/react-query';
import useLoadBoard from '../hooks/useLoadBoard';

export default function GetParam() {
  // const { boardId } = useParams();

  return <Board />;
}
