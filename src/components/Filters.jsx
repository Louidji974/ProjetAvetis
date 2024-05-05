import { useState } from "react";

const Filters = (props) => {
  const [locationTypeFilter, setLocationTypeFilter] = useState("");

  const handleLocationTypeFilterChange = (event) => {
    const selectedLocationType = event.target.value;
    setLocationTypeFilter(selectedLocationType);
    props.handleLocationTypeFilterChange(selectedLocationType);
  };

  return (
    <div className="w-1/4 p-2">
      <h2 className="font-bold mb-2">Filtres</h2>

      <div className="mt-4">
        <label htmlFor="location-type-filter" className="block font-bold mb-1">
          Type de lieu :
        </label>
        <select
          id="location-type-filter"
          value={locationTypeFilter}
          onChange={handleLocationTypeFilterChange}
          className="w-full border border-gray-300 rounded-md p-2"
        >
          <option value="">Tous les types de lieu</option>
          {props.uniqueLocationTypes.map((locationType) => (
            <option key={locationType} value={locationType}>
              {locationType}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Filters;
