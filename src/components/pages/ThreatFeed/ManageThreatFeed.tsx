import {
  Button,
  ButtonBase,
  ButtonGroup,
  Checkbox,
  createStyles,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  fade,
  Grid,
  GridSize,
  IconButton,
  Link,
  makeStyles,
  Paper,
  Typography,
} from "@material-ui/core";
import { AssignmentTurnedIn, Close, MoreVert } from "@material-ui/icons";
import ReactJson from "react-json-view";
import {
  ThreatFeed,
  selectThreatFeeds,
  update,
} from "../../../redux/threatFeedSlice";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { format, parse } from "date-fns";
import { useState } from "react";

const useStyles = makeStyles((theme) =>
  createStyles({
    container: {
      padding: theme.spacing(3),
      width: "100%",
    },
    threatFeedSummary: {
      display: "flex",
      minHeight: "50px",
      padding: theme.spacing(2),
    },
    addNew: {
      display: "flex",
      minHeight: "50px",
      width: "100%",
      padding: theme.spacing(3.5),
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.primary.light, 0.1),
      border: `3px dashed ${fade(theme.palette.primary.main, 0.1)}`,
      color: fade(theme.palette.primary.dark, 0.7),
      fontSize: theme.typography.h6.fontSize,
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

export default function ManageThreatFeed() {
  const classes = useStyles();

  const threatFeeds = useAppSelector(selectThreatFeeds);

  return (
    <Grid className={classes.container} container spacing={2}>
      <AddNewButton />
      {threatFeeds.map((dash) => (
        <ThreatFeedSummary
          key={`threatFeed-summary-${dash.id}`}
          threatFeed={dash}
        />
      ))}
    </Grid>
  );
}

function AddNewButton() {
  const classes = useStyles();

  return (
    <Grid item xs={12}>
      <ButtonBase className={classes.addNew}>
        Add New Threat Intelligence Feed+
      </ButtonBase>
    </Grid>
  );
}

function ThreatFeedSummary({ threatFeed }: { threatFeed: ThreatFeed }) {
  const classes = useStyles();
  const dispatch = useAppDispatch();

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Grid item xs={12}>
      <Paper className={classes.threatFeedSummary}>
        <Grid container direction="row" spacing={2}>
          <ThreatFeedSummaryItem title="ACTIVE">
            <Checkbox
              checked={threatFeed.isActive}
              color="primary"
              onChange={(e) => {
                dispatch(
                  update({
                    id: threatFeed.id,
                    newThreatFeed: {
                      ...threatFeed,
                      isActive: e.target.checked,
                    },
                  })
                );
              }}
            />
          </ThreatFeedSummaryItem>
          <ThreatFeedSummaryItem title="NAME">
            <Typography>{threatFeed.name}</Typography>
          </ThreatFeedSummaryItem>
          <ThreatFeedSummaryItem title="URL">
            <Typography>
              <Link href={threatFeed.url} rel="noopener noreferrer">
                <Typography
                  variant="body2"
                  style={{ maxWidth: "200px" }}
                  noWrap
                >
                  {threatFeed.url}
                </Typography>
              </Link>
            </Typography>
          </ThreatFeedSummaryItem>
          <ThreatFeedSummaryItem title="LAST SYNCED">
            {format(
              parse(threatFeed.lastSyncTimestamp, "T", new Date()),
              "hh:mm bbb, eee LLLL Mo"
            )}
          </ThreatFeedSummaryItem>
          <ThreatFeedSummaryItem title="POLL INTERVAL">
            {threatFeed.pollInterval}
          </ThreatFeedSummaryItem>
        </Grid>
        <Divider flexItem orientation="vertical" variant="middle" />
        <ThreatFeedSummaryItem title="ACTIONS">
          <ButtonGroup
            variant="outlined"
            color="primary"
            disableElevation
            size="small"
          >
            <Button
              variant="contained"
              startIcon={<AssignmentTurnedIn />}
              onClick={handleClickOpen}
            >
              Test
            </Button>
            <Button>auth</Button>
            <Button onClick={handleClickOpen}>
              <MoreVert />
            </Button>
          </ButtonGroup>
        </ThreatFeedSummaryItem>
        <TestDialog
          title={threatFeed.name}
          open={open}
          url={threatFeed.url}
          handleClose={handleClose}
        />
      </Paper>
    </Grid>
  );
}

function ThreatFeedSummaryItem({
  title,
  children,
  xs,
}: {
  title: string;
  children: any;
  xs?: GridSize;
}) {
  return (
    <Grid
      item
      xs={xs || true}
      container
      direction="column"
      // alignItems='center'
    >
      <Grid item>
        <Typography color="textSecondary" variant="subtitle2">
          {title}
        </Typography>
      </Grid>
      <Grid item xs container alignContent="center">
        {children}
      </Grid>
    </Grid>
  );
}

function TestDialog({
  title,
  open,
  url,
  handleClose,
}: {
  title: string;
  open: boolean;
  url: string;
  handleClose: () => void;
}) {
  const classes = useStyles();
  const data = getJson();

  return (
    <Dialog onClose={handleClose} open={open} fullWidth maxWidth="md">
      <DialogTitle
        id="simple-dialog-title"
        // classes={{ root: classes.dialog }}
        style={{
          position: "relative",
          justifyContent: "space-between",
        }}
      >
        Testing: {title}
        <IconButton onClick={handleClose} className={classes.closeButton}>
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent className={classes.dialog}>
        <ReactJson src={data} theme="monokai" />
      </DialogContent>
    </Dialog>
  );
}

const getJson = () => {
  return {
    response: {
      numFound: 5418,
      start: 0,
      maxScore: 6.539637,
      docs: [
        {
          id: "10.1371/journal.pone.0000290",
          journal: "PLoS ONE",
          eissn: "1932-6203",
          publication_date: "2007-03-14T00:00:00Z",
          article_type: "Research Article",
          author_display: [
            "Rayna I. Kraeva",
            "Dragomir B. Krastev",
            "Assen Roguev",
            "Anna Ivanova",
            "Marina N. Nedelcheva-Veleva",
            "Stoyno S. Stoynov",
          ],
          abstract: [
            "Nucleic acids, due to their structural and chemical properties, can form double-stranded secondary structures that assist the transfer of genetic information and can modulate gene expression. However, the nucleotide sequence alone is insufficient in explaining phenomena like intron-exon recognition during RNA processing. This raises the question whether nucleic acids are endowed with other attributes that can contribute to their biological functions. In this work, we present a calculation of thermodynamic stability of DNA/DNA and mRNA/DNA duplexes across the genomes of four species in the genus Saccharomyces by nearest-neighbor method. The results show that coding regions are more thermodynamically stable than introns, 3′-untranslated regions and intergenic sequences. Furthermore, open reading frames have more stable sense mRNA/DNA duplexes than the potential antisense duplexes, a property that can aid gene discovery. The lower stability of the DNA/DNA and mRNA/DNA duplexes of 3′-untranslated regions and the higher stability of genes correlates with increased mRNA level. These results suggest that the thermodynamic stability of DNA/DNA and mRNA/DNA duplexes affects mRNA transcription.",
          ],
          title_display:
            "Stability of mRNA/DNA and DNA/DNA Duplexes Affects mRNA Transcription",
          score: 6.539637,
        },
        {
          id: "10.1371/journal.pone.0154785",
          journal: "PLOS ONE",
          eissn: "1932-6203",
          publication_date: "2016-05-04T00:00:00Z",
          article_type: "Research Article",
          author_display: [
            "Choon Seok Oh",
            "Jean Sippy",
            "Bridget Charbonneau",
            "Jennifer Crow Hutchinson",
            "Olga Esther Mejia-Romero",
            "Michael Barton",
            "Priyal Patel",
            "Rachel Sippy",
            "Michael Feiss",
          ],
          abstract: [
            "\nDuring progeny assembly, viruses selectively package virion genomes from a nucleic acid pool that includes host nucleic acids. For large dsDNA viruses, including tailed bacteriophages and herpesviruses, immature viral DNA is recognized and translocated into a preformed icosahedral shell, the prohead. Recognition involves specific interactions between the viral packaging enzyme, terminase, and viral DNA recognition sites. Generally, viral DNA is recognized by terminase’s small subunit (TerS). The large terminase subunit (TerL) contains translocation ATPase and endonuclease domains. In phage lambda, TerS binds a sequence repeated three times in cosB, the recognition site. TerS binding to cosB positions TerL to cut the concatemeric DNA at the adjacent nicking site, cosN. TerL introduces staggered nicks in cosN, generating twelve bp cohesive ends. Terminase separates the cohesive ends and remains bound to the cosB-containing end, in a nucleoprotein structure called Complex I. Complex I docks on the prohead’s portal vertex and translocation ensues. DNA topology plays a role in the TerSλ-cosBλ interaction. Here we show that a site, I2, located between cosN and cosB, is critically important for an early DNA packaging step. I2 contains a complex static bend. I2 mutations block DNA packaging. I2 mutant DNA is cut by terminase at cosN in vitro, but in vivo, no cos cleavage is detected, nor is there evidence for Complex I. Models for what packaging step might be blocked by I2 mutations are presented.\n",
          ],
          title_display:
            "DNA Topology and the Initiation of Virus DNA Packaging",
          score: 6.3032713,
        },
        {
          id: "10.1371/journal.pone.0047101",
          journal: "PLoS ONE",
          eissn: "1932-6203",
          publication_date: "2012-11-08T00:00:00Z",
          article_type: "Research Article",
          author_display: [
            "Sheng-Yu Wang",
            "Yueh-Luen Lee",
            "Yi-Hua Lai",
            "Jeremy J. W. Chen",
            "Wen-Lin Wu",
            "Jeu-Ming P. Yuann",
            "Wang-Lin Su",
            "Show-Mei Chuang",
            "Ming-Hon Hou",
          ],
          abstract: [
            "\n        The anticancer activity of DNA intercalators is related to their ability to intercalate into the DNA duplex with high affinity, thereby interfering with DNA replication and transcription. Polyamines (spermine in particular) are almost exclusively bound to nucleic acids and are involved in many cellular processes that require nucleic acids. Until now, the effects of polyamines on DNA intercalator activities have remained unclear because intercalation is the most important mechanism employed by DNA-binding drugs. Herein, using actinomycin D (ACTD) as a model, we have attempted to elucidate the effects of spermine on the action of ACTD, including its DNA-binding ability, RNA and DNA polymerase interference, and its role in the transcription and replication inhibition of ACTD within cells. We found that spermine interfered with the binding and stabilization of ACTD to DNA. The presence of increasing concentrations of spermine enhanced the transcriptional and replication activities of RNA and DNA polymerases, respectively, in vitro treated with ActD. Moreover, a decrease in intracellular polyamine concentrations stimulated by methylglyoxal-bis(guanylhydrazone) (MGBG) enhanced the ACTD-induced inhibition of c-myc transcription and DNA replication in several cancer cell lines. The results indicated that spermine attenuates ACTD binding to DNA and its inhibition of transcription and DNA replication both in vitro and within cells. Finally, a synergistic antiproliferative effect of MGBG and ACTD was observed in a cell viability assay. Our findings will be of significant relevance to future developments in combination with cancer therapy by enhancing the anticancer activity of DNA interactors through polyamine depletion.\n      ",
          ],
          title_display:
            "Spermine Attenuates the Action of the DNA Intercalator, Actinomycin D, on DNA Binding and the Inhibition of Transcription and DNA Replication",
          score: 6.1791353,
        },
        {
          id: "10.1371/journal.pbio.0020173",
          journal: "PLoS Biology",
          eissn: "1545-7885",
          publication_date: "2004-06-22T00:00:00Z",
          article_type: "Research Article",
          author_display: ["David R Halpin", "Pehr B Harbury"],
          abstract: [
            "\n        Recently reported technologies for DNA-directed organic synthesis and for DNA computing rely on routing DNA populations through complex networks. The reduction of these ideas to practice has been limited by a lack of practical experimental tools. Here we describe a modular design for DNA routing genes, and routing machinery made from oligonucleotides and commercially available chromatography resins. The routing machinery partitions nanomole quantities of DNA into physically distinct subpools based on sequence. Partitioning steps can be iterated indefinitely, with worst-case yields of 85% per step. These techniques facilitate DNA-programmed chemical synthesis, and thus enable a materials biology that could revolutionize drug discovery.\n      \n        Resin-linked oligonucleotides are described that efficiently partition subpools of DNA based on sequence, enabling DNA- programmed chemical synthesis.\n      ",
          ],
          title_display:
            "DNA Display I. Sequence-Encoded Routing of DNA Populations",
          score: 6.130892,
        },
        {
          id: "10.1371/journal.pgen.0030110",
          journal: "PLoS Genetics",
          eissn: "1553-7404",
          publication_date: "2007-07-06T00:00:00Z",
          article_type: "Research Article",
          author_display: [
            "Concetta Cuozzo",
            "Antonio Porcellini",
            "Tiziana Angrisano",
            "Annalisa Morano",
            "Bongyong Lee",
            "Alba Di Pardo",
            "Samantha Messina",
            "Rodolfo Iuliano",
            "Alfredo Fusco",
            "Maria R Santillo",
            "Mark T Muller",
            "Lorenzo Chiariotti",
            "Max E Gottesman",
            "Enrico V Avvedimento",
          ],
          abstract: [
            "To explore the link between DNA damage and gene silencing, we induced a DNA double-strand break in the genome of Hela or mouse embryonic stem (ES) cells using I-SceI restriction endonuclease. The I-SceI site lies within one copy of two inactivated tandem repeated green fluorescent protein (GFP) genes (DR-GFP). A total of 2%–4% of the cells generated a functional GFP by homology-directed repair (HR) and gene conversion. However, ~50% of these recombinants expressed GFP poorly. Silencing was rapid and associated with HR and DNA methylation of the recombinant gene, since it was prevented in Hela cells by 5-aza-2′-deoxycytidine. ES cells deficient in DNA methyl transferase 1 yielded as many recombinants as wild-type cells, but most of these recombinants expressed GFP robustly. Half of the HR DNA molecules were de novo methylated, principally downstream to the double-strand break, and half were undermethylated relative to the uncut DNA. Methylation of the repaired gene was independent of the methylation status of the converting template. The methylation pattern of recombinant molecules derived from pools of cells carrying DR-GFP at different loci, or from an individual clone carrying DR-GFP at a single locus, was comparable. ClustalW analysis of the sequenced GFP molecules in Hela and ES cells distinguished recombinant and nonrecombinant DNA solely on the basis of their methylation profile and indicated that HR superimposed novel methylation profiles on top of the old patterns. Chromatin immunoprecipitation and RNA analysis revealed that DNA methyl transferase 1 was bound specifically to HR GFP DNA and that methylation of the repaired segment contributed to the silencing of GFP expression. Taken together, our data support a mechanistic link between HR and DNA methylation and suggest that DNA methylation in eukaryotes marks homologous recombined segments.: Genomic DNA can be modified by cytosine methylation. This epigenetic modification is layered on the primary genetic information and can silence the affected gene. Epigenetic modification has been implicated in cancer and aging. To date, the primary cause and the mechanism leading to DNA methylation are not known. By using a sophisticated genetic system, we have induced a single break in the double helix of the genomes of mouse or human cells. This rupture was repaired by a very precise mechanism: the damaged chromosome pairs and retrieves genetic information from an undamaged and homologous DNA partner. This homology-directed repair was marked in half of the repaired molecules by de novo methylation of cytosines flanking the cut. As a direct consequence, the gene in these repaired molecules was silenced. In the remaining molecules, the recombinant DNA was undermethylated and expressed the reconstituted gene. Since homology-directed repair may duplicate or delete genetic information, epigenetic modification of repaired DNA represents a powerful evolutionary force. If the expression of the repaired gene is harmful, only cells inheriting the silenced copy will survive. Conversely, if the function of the repaired gene is beneficial, cells inheriting the under-methylated copy will have a selective advantage. ",
          ],
          title_display:
            "DNA Damage, Homology-Directed Repair, and DNA Methylation",
          score: 6.130892,
        },
        {
          id: "10.1371/annotation/254cef67-ab0e-43f6-af62-8f7df7c3677c",
          journal: "PLoS ONE",
          eissn: "1932-6203",
          publication_date: "2013-05-15T00:00:00Z",
          article_type: "Correction",
          author_display: [
            "Sheng-Yu Wang",
            "Alan Yueh-Luen Lee",
            "Yi-Hua Lai",
            "Jeremy J. W. Chen",
            "Wen-Lin Wu",
            "Jeu-Ming P. Yuann",
            "Wang-Lin Su",
            "Show-Mei Chuang",
            "Ming-Hon Hou",
          ],
          abstract: [""],
          title_display:
            "Correction: Spermine Attenuates the Action of the DNA Intercalator, Actinomycin D, on DNA Binding and the Inhibition of Transcription and DNA Replication",
          score: 6.067641,
        },
        {
          id: "10.1371/journal.pone.0124444",
          journal: "PLOS ONE",
          eissn: "1932-6203",
          publication_date: "2015-04-29T00:00:00Z",
          article_type: "Research Article",
          author_display: [
            "Josef Štěpánek",
            "Vladimír Kopecký Jr.",
            "Pierre-Yves Turpin",
            "Zhenlin Li",
            "Bernard Alpert",
            "Christian Zentz",
          ],
          abstract: [
            "\nThe transcriptional activity of the serum response factor (SRF) protein is triggered by its binding to a 10-base-pair DNA consensus sequence designated the CArG box, which is the core sequence of the serum response element (SRE). Sequence-specific recognition of the CArG box by a core domain of 100 amino acid residues of SRF (core-SRF) was asserted to depend almost exclusively on the intrinsic SRE conformation and on the degree of protein-induced SRE bending. Nevertheless, this paradigm was invalidated by a temperature-dependent Raman spectroscopy study of 20-mer oligonucleotides involved in bonding interactions with core-SRF that reproduced both wild type and mutated c-fos SREs. Indeed, the SRE moieties that are complexed with core-SRF exhibit permanent interconversion dynamics between bent and linear conformers. Thus, sequence-specific recognition of the CArG box by core-SRF cannot be explained only in terms of the three-dimensional structure of the SRE. A particular dynamic pairing process discriminates between the wild type and mutated complexes. Specific oscillations of the phosphate charge network of the SRE govern the recognition between both partners rather than an intrinsic set of conformations of the SRE.\n",
          ],
          title_display:
            "DNA Electric Charge Oscillations Govern Protein–DNA Recognition",
          score: 5.9676895,
        },
        {
          id: "10.1371/journal.pone.0177147",
          journal: "PLOS ONE",
          eissn: "1932-6203",
          publication_date: "2017-05-03T00:00:00Z",
          article_type: "Research Article",
          author_display: [
            "Irina Bruck",
            "Nalini Dhingra",
            "Matthew P. Martinez",
            "Daniel L. Kaplan",
          ],
          abstract: [
            "\nDpb11 is required for the initiation of DNA replication in budding yeast. We found that Dpb11 binds tightly to single-stranded DNA (ssDNA) or branched DNA structures, while its human homolog, TopBP1, binds tightly to branched-DNA structures. We also found that Dpb11 binds stably to CDK-phosphorylated RPA, the eukaryotic ssDNA binding protein, in the presence of branched DNA. A Dpb11 mutant specifically defective for DNA binding did not exhibit tight binding to RPA in the presence of DNA, suggesting that Dpb11-interaction with DNA may promote the recruitment of RPA to melted DNA. We then characterized a mutant of Dpb11 that is specifically defective in DNA binding in budding yeast cells. Expression of dpb11-m1,2,3,5,ΔC results in a substantial decrease in RPA recruitment to origins, suggesting that Dpb11 interaction with DNA may be required for RPA recruitment to origins. Expression of dpb11-m1,2,3,5,ΔC also results in diminished GINS interaction with Mcm2-7 during S phase, while Cdc45 interaction with Mcm2-7 is like wild-type. The reduced GINS interaction with Mcm2-7 may be an indirect consequence of diminished origin melting. We propose that the tight interaction between Dpb11, CDK-phosphorylated RPA, and branched-DNA may be required for the essential function of stabilizing melted origin DNA in vivo. We also propose an alternative model, wherein Dpb11-DNA interaction is required for some other function in DNA replication initiation, such as helicase activation.\n",
          ],
          title_display:
            "Dpb11 may function with RPA and DNA to initiate DNA replication",
          score: 5.9676895,
        },
        {
          id: "10.1371/journal.pgen.1006605",
          journal: "PLOS Genetics",
          eissn: "1553-7404",
          publication_date: "2017-02-10T00:00:00Z",
          article_type: "Correction",
          author_display: [
            "Concetta Cuozzo",
            "Antonio Porcellini",
            "Tiziana Angrisano",
            "Annalisa Morano",
            "Bongyong Lee",
            "Alba Di Pardo",
            "Samantha Messina",
            "Rodolfo Iuliano",
            "Alfredo Fusco",
            "Maria R. Santillo",
            "Mark T. Muller",
            "Lorenzo Chiariotti",
            "Max E. Gottesman",
            "Enrico V. Avvedimento",
          ],
          abstract: [""],
          title_display:
            "Correction: DNA Damage, Homology-Directed Repair, and DNA Methylation",
          score: 5.9676895,
        },
        {
          id: "10.1371/journal.pone.0180798",
          journal: "PLOS ONE",
          eissn: "1932-6203",
          publication_date: "2017-07-12T00:00:00Z",
          article_type: "Research Article",
          author_display: [
            "Lukas Nejdl",
            "Jiri Kudr",
            "Amitava Moulick",
            "Dagmar Hegerova",
            "Branislav Ruttkay-Nedecky",
            "Jaromir Gumulec",
            "Kristyna Cihalova",
            "Kristyna Smerkova",
            "Simona Dostalova",
            "Sona Krizkova",
            "Marie Novotna",
            "Pavel Kopel",
            "Vojtech Adam",
          ],
          abstract: [
            "\nSparsely tested group of platinum nanoparticles (PtNPs) may have a comparable effect as complex platinum compounds. The aim of this study was to observe the effect of PtNPs in in vitro amplification of DNA fragment of phage λ, on the bacterial cultures (Staphylococcus aureus), human foreskin fibroblasts and erythrocytes. In vitro synthesized PtNPs were characterized by dynamic light scattering (PtNPs size range 4.8–11.7 nm), zeta potential measurements (-15 mV at pH 7.4), X-ray fluorescence, UV/vis spectrophotometry and atomic absorption spectrometry. The PtNPs inhibited the DNA replication and affected the secondary structure of DNA at higher concentrations, which was confirmed by polymerase chain reaction, DNA sequencing and DNA denaturation experiments. Further, cisplatin (CisPt), as traditional chemotherapy agent, was used in all parallel experiments. Moreover, the encapsulation of PtNPs in liposomes (LipoPtNPs) caused an approximately 2.4x higher of DNA damage in comparison with CisPt, LipoCisPt and PtNPs. The encapsulation of PtNPs in liposomes also increased their antibacterial, cytostatic and cytotoxic effect, which was determined by the method of growth curves on S. aureus and HFF cells. In addition, both the bare and encapsulated PtNPs caused lower oxidative stress (determined by GSH/GSSG ratio) in the human erythrocytes compared to the bare and encapsulated CisPt. CisPt was used in all parallel experiments as traditional chemotherapy agent.\n",
          ],
          title_display:
            "Platinum nanoparticles induce damage to DNA and inhibit DNA replication",
          score: 5.9676895,
        },
      ],
    },
  };
};
