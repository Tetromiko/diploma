import React, { createContext, useState, useCallback } from "react";
import { ContextMenu } from "@/components/ContextMenu";

type MenuOption = {
  label: string;
  onPress: () => void;
  style?: object;
};

type ContextMenuState = {
  x: number;
  y: number;
  menuOptions: MenuOption[];
  onClosed?: () => void;
} | null;

export const ContextMenuContext = createContext<{
  showMenu: (opts: {
    x: number;
    y: number;
    menuOptions: MenuOption[];
    onClosed?: () => void;
  }) => void;
  hideMenu: () => void;
}>({
  showMenu: () => {},
  hideMenu: () => {},
});

export const ContextMenuProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [menu, setMenu] = useState<ContextMenuState>(null);

  const showMenu = useCallback(
    ({
      x,
      y,
      menuOptions,
      onClosed,
    }: {
      x: number;
      y: number;
      menuOptions: MenuOption[];
      onClosed?: () => void;
    }) => {
      setMenu({ x, y, menuOptions, onClosed });
    },
    []
  );

  const hideMenu = useCallback(() => setMenu(null), []);

  return (
    <ContextMenuContext.Provider value={{ showMenu, hideMenu }}>
      {children}
      {menu && (
        <ContextMenu
          x={menu.x}
          y={menu.y}
          menuOptions={menu.menuOptions}
          onClose={hideMenu}
          onClosed={menu.onClosed}
        />
      )}
    </ContextMenuContext.Provider>
  );
};
