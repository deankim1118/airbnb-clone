import EmptyList from '@/components/home/EmptyList';
import { fetchFavorites } from '@/utils/actions';
import PropertiesList from '../../components/home/PropertiesList';

export default async function FavoritesPage() {
  const favorites = await fetchFavorites();
  if (!favorites) {
    return <EmptyList />;
  }

  return <PropertiesList properties={favorites} />;
}
