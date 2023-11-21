import { useSelector } from "react-redux";
import { AddFieldCard, Empty } from "../components";
import { toggleAddField } from "../features/collectionSlice";

const Fields = () => {
  const { fields, isAddFieldOpen, isFieldSelected } = useSelector(
    (store) => store.collection
  );

  if (fields.length === 0) {
    return (
      <>
        <Empty
          text="Custom fields don't added yet"
          btnText="Add Field"
          paragraph="The field type defines what content can be stored. For instance, a text field accepts titles and descriptions, and a number field is used for numeric values."
          toggle={toggleAddField}
        />
        <AddFieldCard
          isAddFieldOpen={isAddFieldOpen}
          isFieldSelected={isFieldSelected}
          toggleAddField={toggleAddField}
        />
      </>
    );
  }
  return <div>Fields</div>;
};

export default Fields;
