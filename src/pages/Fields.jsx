import { useSelector } from "react-redux";
import { CollectionCard, Empty } from "../components";

const Fields = () => {
  const { fields, isCollectionOpen } = useSelector((store) => store.collection);

  if (fields.length === 0) {
    return (
      <>
        <Empty
          text="Custom fields don't added yet"
          btnText="Add Field"
          paragraph="The field type defines what content can be stored. For instance, a text field accepts titles and descriptions, and a number field is used for numeric values."
        />
        <CollectionCard isCollectionOpen={isCollectionOpen} />
      </>
    );
  }
  return <div>Fields</div>;
};

export default Fields;
