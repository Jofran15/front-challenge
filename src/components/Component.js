import { useRef, useState } from "react";
import Moveable from "react-moveable";

const Component = ({
  updateMoveable,
  top,
  left,
  width,
  height,
  index,
  color,
  id,
  setSelected,
  isSelected = false,
  updateEnd,
  image,
  objectFit,
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const ref = useRef();

  const [nodoReferencia, setNodoReferencia] = useState({
    top,
    left,
    width,
    height,
    index,
    color,
    id,
  });

  const remove = () => {
    setIsVisible(false);
  };

  const onResize = async (e) => {
    let newWidth = e.width;

    let newHeight = e.height;

    updateMoveable(id, {
      top,
      left,
      width: newWidth,
      height: newHeight,
      color,
      image,
      objectFit,
    });

    // ACTUALIZAR NODO REFERENCIA
    ref.current.style.width = `${e.width}px`;

    ref.current.style.height = `${e.height}px`;

    const beforeTranslate = e.drag.beforeTranslate;

    let translateX = beforeTranslate[0];
    let translateY = beforeTranslate[1];

    ref.current.style.transform = `translate(${translateX}px, ${translateY}px)`;

    setNodoReferencia({
      ...nodoReferencia,
    });
  };

  const onResizeEnd = async (e) => {
    let newWidth = e.lastEvent?.width;
    let newHeight = e.lastEvent?.height;

    updateMoveable(
      id,
      {
        top,
        left,
        width: newWidth,
        height: newHeight,
        color,
        image,
        objectFit,
      },
      true
    );
  };

  return (
    <>
      {isVisible && (
        <>
          <div
            ref={ref}
            className="draggable"
            id={"component-" + id}
            style={{
              position: "absolute",
              top: top,
              left: left,
              width: width,
              height: height,
              background: color,
              overflow: "hidden",
            }}
            onClick={() => setSelected(id)}
          >
            <button
              style={{ position: "absolute", top: 0, left: 0 }}
              onClick={remove}
            >
              Eliminar
            </button>
            <img
              style={{
                maxWidth: "100%",
                maxHeight: "100%",
                objectFit: objectFit,
              }}
              src={image}
              alt="imagen"
            />
          </div>

          <Moveable
            target={isSelected && ref.current}
            resizable
            draggable
            snappable
            bounds={{ left: 0, top: 0, right: 0, bottom: 0, position: "css" }}
            onDrag={(e) => {
              updateMoveable(id, {
                top: e.top,
                left: e.left,
                width,
                height,
                color,
                image,
                objectFit,
              });
            }}
            onResize={onResize}
            onResizeEnd={onResizeEnd}
            keepRatio={false}
            throttleResize={1}
            renderDirections={["nw", "n", "ne", "w", "e", "sw", "s", "se"]}
            edge={false}
            zoom={1}
            origin={false}
            padding={{ left: 0, top: 0, right: 0, bottom: 0 }}
          />
        </>
      )}
    </>
  );
};

export default Component;
