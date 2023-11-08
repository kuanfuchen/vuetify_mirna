import { BehaviorSubject, Subject } from 'rxjs';
const _ReadAlignmentSubject$ = new BehaviorSubject({});
const _visualization_table$ = new BehaviorSubject({});
const _transferMeg$ = new Subject({});
// let microRNA_countTab = {};

// txt
import pre_alignment_qaqc from '../assets/miRNA-seq/Bowtie2/00. QC (Trim adaptor & Trim base)/01. Raw reads/pre_alignment_qaqc.txt?raw';
import adaptor_trimming from '../assets/miRNA-seq/Bowtie2/00. QC (Trim adaptor & Trim base)/02. Adaptor Trimming/pre_alignment_qaqc.txt?raw';
import base_trimming from '../assets/miRNA-seq/Bowtie2/00. QC (Trim adaptor & Trim base)/03. Base Trimming/pre_alignment_qaqc.txt?raw'
import post_alignment from '../assets/miRNA-seq/Bowtie2/00. QC (Trim adaptor & Trim base)/04. post alignment/post_alignment_qaqc.txt?raw';
import microRNA_counts from '../assets/miRNA-seq/Bowtie2/01. raw reads/microRNA_counts.txt?raw';
import CPM_Normalized_counts from '../assets/miRNA-seq/Bowtie2/02. normalized reads/GSA (CPM)/CPM_Normalized_counts.txt?raw';
// import gsa_result from '../assets/miRNA-seq/Bowtie2/03. DE miRNAs/GSA/filtered/miRNA-seq_project_015_Pett_exosome_8_samples_Differential_analysis_Filtered_CE1-5vsCE1-0/gsa_result.txt'

const handleQCReadAlignmentfolder = async() => {
  const readAlignmentTitle = ['RawRead', 'TrimmedRead','Base trimming', 'Alignment'];
  const handleFinish_pre_alignment_qaqc = handleSplitTxt(pre_alignment_qaqc);
  const handleFinish_adaptor_trimming = handleSplitTxt(adaptor_trimming);
  const handleFinish_base_trimming = handleSplitTxt(base_trimming);
  const handleFinish_post_alignment = handleSplitTxt(post_alignment);
  
  
  const miRNATabs = {
    tabs: readAlignmentTitle,
    tabsTable: [handleFinish_pre_alignment_qaqc, handleFinish_adaptor_trimming, handleFinish_base_trimming, handleFinish_post_alignment]
  }
  await _ReadAlignmentSubject$.next(miRNATabs);
};
const handleRawReadsFolder = async() => {
  const microRNA_countTitle = ['Raw_Reads','Normalized_Reads'];
  const handleFinish_microRNA_counts = handleSplitTxt(microRNA_counts);
  const handleFinish_CPM_Normalized_counts = handleSplitTxt(CPM_Normalized_counts);
  const microRNA_countTab = {
    tabs: microRNA_countTitle,
    tabsTable:[handleFinish_microRNA_counts, handleFinish_CPM_Normalized_counts]
  }
  await _visualization_table$.next(microRNA_countTab);
}
const handleSplitTxt = (tableInfo) => {
  const miRNATable = {
    headers:[],
    body:[]
  };
  const split_tableInfo = tableInfo.split(/\n/);
  for(let i = 0 ; split_tableInfo.length > i ; i++){
    const removeSpace_split_tableInfo = split_tableInfo[i].split(/\t/);
    if(removeSpace_split_tableInfo.length === 1) continue;
    if(i === 0) {
      miRNATable.headers = removeSpace_split_tableInfo;
    }else{
      miRNATable.body[i - 1] = [];
      miRNATable.body[i - 1] = removeSpace_split_tableInfo;
    }
  }
  return miRNATable
};
const transferHandleFinishMeg = (handleInfo) => _transferMeg$.next(handleInfo);
export const dataService = {
  handleQCReadAlignmentfolder,
  handleRawReadsFolder,
  transferHandleFinishMeg,
  ReadAlignmentSubject$: _ReadAlignmentSubject$.asObservable(),
  handleRawReadsFolder$: _visualization_table$.asObservable(),
  transferMeg$: _transferMeg$.asObservable(),
} 