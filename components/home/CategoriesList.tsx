import { categories } from '@/utils/categories';
import { ScrollArea, ScrollBar } from '../ui/scroll-area';
import Link from 'next/link';

export default function CategoriesList({
  category,
  search,
}: {
  category?: string;
  search?: string;
}) {
  const searchTerm = search ? `&search=${search}` : '';

  return (
    <section>
      <ScrollArea className='py-6'>
        <div className='flex gap-4'>
          {categories.map((item) => {
            const isActive = item.label === category;
            return (
              <Link
                href={`/?category=${item.label}${searchTerm}`}
                key={item.label}
                className={`p-3 flex flex-col gap-1 items-center cursor-pointer duration-300 w-[100px] hover:text-primary ${
                  isActive && 'text-primary'
                }`}
              >
                <article>
                  <item.icon className='size-8' />
                  <p className='capitalize text-sm mt-1'>{item.label}</p>
                </article>
              </Link>
            );
          })}
        </div>
        <ScrollBar orientation='horizontal' />
      </ScrollArea>
    </section>
  );
}
