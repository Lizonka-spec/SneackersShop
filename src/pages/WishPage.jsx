import { Card } from "../components/index";
import { useAppContext } from "../context/AppContextProvider";

import style from "../styles/general.module.css";

export const WishPage = () => {
  const { wishItems } = useAppContext();
  return (
    <div className={style.mainContent}>
      {wishItems.length > 0 ? (
        wishItems.map((item) => <Card key={item.id} product={item} />)
      ) : (
        <div className={style.messageBox}>
          <div className={style.emptyMessage}>
            <h2>No bookmarks :(</h2>
            <p>You haven't added anything to your favorites.</p>
          </div>
        </div>
      )}
    </div>
  );
};
