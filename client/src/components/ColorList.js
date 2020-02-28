import React, { useState } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";

const initialColor = {
	color: "",
	code: { hex: "" }
};
// { colors, updateColors, callColor }
const ColorList = (props) => {
	console.log("from colors", props.colors);
	const [editing, setEditing] = useState(false);
	const [colorToEdit, setColorToEdit] = useState(initialColor);

	const editColor = color => {
		setEditing(true);
		setColorToEdit(color);
	};

	const saveEdit = e => {
		e.preventDefault();
    // Make a put request to save your updated color
    console.log(colorToEdit);
		// think about where will you get the id from...
		// where is is saved right now?
		axiosWithAuth()
      .put(`/api/colors/${colorToEdit.id}`, {
        color: colorToEdit.color,
        code: colorToEdit.code, 
        id: colorToEdit.id
      })
			.then(res => {
        console.log("from put reqeust", res.data);
        props.callColor();
			})
			.catch(err => {
				console.log(err);
			});
	};

	const deleteColor = color => {
		// make a delete request to delete this color
	};

	return (
		<div className="colors-wrap">
			<p>colors</p>
			<ul>
				{props.colors.map(color => (
					<li key={color.color} onClick={() => editColor(color)}>
						<span>
							<span
								className="delete"
								onClick={e => {
									e.stopPropagation();
									deleteColor(color);
								}}
							>
								x
							</span>{" "}
							{color.color}
						</span>
						<div
							className="color-box"
							style={{ backgroundColor: color.code.hex }}
						/>
					</li>
				))}
			</ul>
			{editing && (
				<form onSubmit={saveEdit}>
					<legend>edit color</legend>
					<label>
						color name:
						<input
							onChange={e =>
								setColorToEdit({ ...colorToEdit, color: e.target.value })
							}
							value={colorToEdit.color}
						/>
					</label>
					<label>
						hex code:
						<input
							onChange={e =>
								setColorToEdit({
									...colorToEdit,
									code: { hex: e.target.value }
								})
							}
							value={colorToEdit.code.hex}
						/>
					</label>
					<div className="button-row">
						<button type="submit">save</button>
						<button onClick={() => setEditing(false)}>cancel</button>
					</div>
				</form>
			)}
			<div className="spacer" />
      {/* stretch - build another form here to add a color */}
      	{/* axiosWithAuth()
      .put(`/api/colors/${colorToEdit.id}`, {
        color: colorToEdit.color,
        code: colorToEdit.code, 
        id: colorToEdit.id
      })
			.then(res => {
        console.log("from put reqeust", res.data);
        // const newArray = { ...colors, res }
        updateColors([...colors, res.data]);
			})
			.catch(err => {
				console.log(err);
			}); */}
		</div>
	);
};

export default ColorList;
