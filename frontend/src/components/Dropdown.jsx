/* components/Dropdown.jsx */
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from 'lucide-react';

export default function Dropdown({ label, items = [] }) {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <Menu.Button className="inline-flex w-full justify-center gap-2 rounded-lg bg-primary px-4 py-2 text-white shadow hover:bg-primary/90">
        {label}
        <ChevronDownIcon className="h-4 w-4" />
      </Menu.Button>

      <Transition
        enter="transition ease-out duration-100"
        enterFrom="transform scale-95 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-95 opacity-0"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-lg bg-white py-1 shadow-lg ring-1 ring-black/5 focus:outline-none">
          {items.map(({ id, label, onClick }) => (
            <Menu.Item key={id}>
              {({ active }) => (
                <button
                  onClick={onClick}
                  className={`${
                    active ? 'bg-surface text-primary' : 'text-gray-700'
                  } group flex w-full items-center px-4 py-2 text-sm`}
                >
                  {label}
                </button>
              )}
            </Menu.Item>
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
