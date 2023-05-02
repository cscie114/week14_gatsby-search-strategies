import * as React from "react";
import * as styles from './park.module.css';

const Park = ({ park }) => {
  return (
    <div className={styles.park}>
        <h3>{park.fullName}</h3>
        <p>NPS information at <a href={park.url}>nps.gov/{park.parkCode}</a></p>
        <p>{park.description}</p>
        <div className={styles.images}>
            {park.images.map((img, i) => (
                <figure key={i}>
                    <img src={img.url} alt={img.title} />
                    <figcaption>
                        {img.caption}<br/>
                        <i>{img.credit}</i>
                    </figcaption>
                </figure>
            ))}
        </div>
    </div>
  );
};

export default Park;
