import { WizardProgress } from '@/components/shared'
import { useActiveGroupId } from '@/modules/groups'
import { ImportCheckStep } from '../components/ImportCheckStep'
import { ImportResultStep } from '../components/ImportResultStep'
import { ImportUploadStep } from '../components/ImportUploadStep'
import { useImportWizard } from '../hooks/use-import-wizard'

export function ImportMembersPage() {
  const groupId = useActiveGroupId()
  const flow = useImportWizard(groupId)
  const { wizard, file } = flow
  return (
    <div className="main-narrow mx-auto">
      <WizardProgress step={wizard.step} total={wizard.total} />
      {wizard.step === 0 && (
        <ImportUploadStep
          fileName={file.sheet?.fileName} isReading={file.isReading}
          chapters={flow.chapters} chapterId={flow.chapterId} onChapterChange={flow.setChapterId}
          onFile={file.pickFile} onTemplate={flow.downloadTemplate} onNext={wizard.next}
        />
      )}
      {wizard.step === 1 && file.sheet && file.mapping && file.check && (
        <ImportCheckStep
          sheet={file.sheet} mapping={file.mapping} check={file.check}
          canImport={file.canImport} isImporting={flow.isImporting}
          onMap={file.mapField} onBack={wizard.back} onImport={flow.runImport}
        />
      )}
      {wizard.step === 2 && flow.result && <ImportResultStep result={flow.result} onDownloadIssues={flow.downloadIssues} />}
    </div>
  )
}
