import {
	Table,
	TableBody,
	TableCell,
	TableRow,
	makeStyles,
	IconButton,
	Collapse,
	useTheme,
	Dialog,
	DialogTitle,
	DialogContent,
	ButtonGroup,
	Button,
} from "@material-ui/core";
import { createStyles } from "@material-ui/styles";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { useState } from "react";
import { Document, RequiredDocument } from "../../../redux/frameworkSlice";
import classNames from "classnames";
import {
	Close,
	MoreVert,
	NoteAdd,
	OpenInNew,
	SaveAlt,
	Share,
} from "@material-ui/icons";
import { format, parse } from "date-fns";

const useStyles = makeStyles((theme) =>
	createStyles({
		expandButton: {
			marginLeft: "auto",
			marginRight: "auto",
		},
		expandIcon: {
			transform: "rotate(0deg)",
			marginLeft: "auto",
			transition: theme.transitions.create("transform", {
				duration: theme.transitions.duration.shortest,
			}),
		},
		expandIconOpen: {
			transform: "rotate(180deg)",
		},
		tableBody: {
			display: "flex",
			flexGrow: 1,
			width: "100%",
			boxSizing: "border-box",
			overflowY: "auto",
		},
		headerCell: {
			fontSize: theme.typography.body1.fontSize,
			borderBottom: 0,
		},
		tableCell: {
			borderBottom: 0,
		},
		avatar: {
			margin: 0,
		},
		dialog: {
			// width: "80vw",
			height: "75vh",
			overflow: "visible",
			paddingBottom: theme.spacing(3),
		},
		closeButton: {
			position: "absolute",
			right: theme.spacing(1),
			top: theme.spacing(1),
		},
	})
);

export default function DocumentList({
	requiredDocs,
	expandParent,
}: {
	requiredDocs: RequiredDocument[];
	expandParent?: () => void;
}) {
	const classes = useStyles();

	return (
		<div className={classes.tableBody}>
			<Table>
				<TableBody>
					{requiredDocs.map((row) => (
						<Row
							key={`required-doc-${row.name}`}
							row={row}
							expandParent={expandParent}
						/>
					))}
				</TableBody>
			</Table>
		</div>
	);
}

function Row({
	row,
	expandParent,
}: {
	row: RequiredDocument;
	expandParent?: () => void;
}) {
	const classes = useStyles();
	const [open, setOpen] = useState(false);

	return (
		<>
			<TableRow key={`${row.name}-tablerow`}>
				<TableCell
					className={classes.headerCell}
					component='th'
					scope='row'
					align='left'
				>
					<strong>{row.name}</strong> - {row.documents.length}{" "}
					Documents
				</TableCell>
				<TableCell
					className={classes.tableCell}
					align='right'
					padding='none'
				>
					<IconButton
						onClick={() => {
							setOpen((prev) => !prev);
							expandParent && expandParent();
						}}
					>
						<ExpandMoreIcon
							className={classNames(classes.expandIcon, {
								[classes.expandIconOpen]: open,
							})}
						/>
					</IconButton>
				</TableCell>
			</TableRow>
			<TableRow key={`${row.name}-tablerow-collapsible`}>
				<TableCell style={{ padding: 0, borderTop: 0 }} colSpan={5}>
					<Collapse in={open} timeout='auto' unmountOnExit>
						<div
							style={{
								display: "flex",
								padding: 16,
								paddingTop: 0,
								// backgroundColor: "#eee",
								justifyContent: "center",
							}}
						>
							<SubList docs={row.documents} title={row.name} />
						</div>
					</Collapse>
				</TableCell>
			</TableRow>
		</>
	);
}

function SubList({ docs, title }: { docs: Document[]; title: string }) {
	const classes = useStyles();

	return (
		<div className={classes.tableBody}>
			<Table>
				<TableBody>
					{docs.map((row, index) => (
						<SubListRow
							key={`doc-${row.id}`}
							row={row}
							isGrey={index % 2 === 0}
						/>
					))}
					<TableRow>
						<TableCell
							className={classes.tableCell}
							scope='row'
							align='center'
							// padding='none'
							colSpan={3}
						>
							<Button
								fullWidth
								startIcon={<NoteAdd />}
								variant='outlined'
								size='large'
								color='primary'
							>
								Add Document to "{title}"
							</Button>
						</TableCell>
					</TableRow>
				</TableBody>
			</Table>
		</div>
	);
}

function SubListRow({
	row,
	isGrey = false,
}: {
	row: Document;
	isGrey?: boolean;
}) {
	const classes = useStyles();
	const theme = useTheme();

	const [open, setOpen] = useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<TableRow
			key={`${row.name}-tablerow`}
			style={{ backgroundColor: isGrey ? theme.palette.grey[50] : "" }}
		>
			<TableCell className={classes.tableCell} scope='row' align='left'>
				{row.name}
			</TableCell>
			<TableCell className={classes.tableCell} scope='row' align='right'>
				Uploaded on{" "}
				{format(
					parse(row.dateUploaded, "T", new Date()),
					"hh:mm bbb, eee LLLL Mo"
				)}
			</TableCell>
			<TableCell
				className={classes.tableCell}
				align='right'
				// padding='none'
			>
				<ButtonGroup color='primary' disableElevation size='small'>
					<Button
						onClick={handleClickOpen}
						startIcon={<OpenInNew />}
						variant='contained'
					>
						Open
					</Button>
					<Button onClick={handleClickOpen}>
						<SaveAlt />
					</Button>
					<Button onClick={handleClickOpen}>
						<Share />
					</Button>
					<Button onClick={handleClickOpen}>
						<MoreVert />
					</Button>
				</ButtonGroup>
				<PdfDialog
					title={row.name}
					open={open}
					link={row.link}
					handleClose={handleClose}
				/>
			</TableCell>
		</TableRow>
	);
}

function PdfDialog({
	title,
	open,
	link,
	handleClose,
}: {
	title: string;
	open: boolean;
	link: string;
	handleClose: () => void;
}) {
	const classes = useStyles();

	return (
		<Dialog onClose={handleClose} open={open} fullWidth maxWidth='md'>
			<DialogTitle
				id='simple-dialog-title'
				// classes={{ root: classes.dialog }}
				style={{
					position: "relative",
					justifyContent: "space-between",
				}}
			>
				{title}
				<IconButton
					onClick={handleClose}
					className={classes.closeButton}
				>
					<Close />
				</IconButton>
			</DialogTitle>
			<DialogContent className={classes.dialog}>
				<object
					data={link}
					// type='application/pdf'
					width='100%'
					height='100%'
				>
					<p>
						link to <a href={link} />
					</p>
				</object>
			</DialogContent>
		</Dialog>
	);
}
