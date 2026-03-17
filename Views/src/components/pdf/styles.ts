import { StyleSheet } from '@react-pdf/renderer';

export const styles = StyleSheet.create({
    page: { padding: 32, fontFamily: 'Helvetica', fontSize: 11, backgroundColor: '#f8fafc' },
    header: { marginBottom: 18, paddingBottom: 8, borderBottomWidth: 1, borderBottomColor: '#cbd5f5' },
    appName: { fontSize: 10, color: '#64748b', marginBottom: 2 },
    title: { fontSize: 18, fontWeight: 'bold', color: '#0f172a' },
    metaBlock: { marginBottom: 16 },
    metaLine: { fontSize: 11, color: '#0f172a', marginBottom: 4 },
    metaLabel: { fontWeight: 'bold' },
    card: { backgroundColor: '#ffffff', borderRadius: 6, padding: 10, marginBottom: 10, borderWidth: 1, borderColor: '#e2e8f0' },
    row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
    label: { color: '#64748b' },
    value: { fontWeight: 'bold', color: '#0f172a' },
    resumoTitulo: { fontSize: 12, fontWeight: 'bold', marginBottom: 6, color: '#0f172a' },
    diffOk: { color: '#16a34a', fontWeight: 'bold' },
    diffError: { color: '#dc2626', fontWeight: 'bold' },
    assinaturaArea: { marginTop: 32 },
    assinaturaLinha: { borderBottomWidth: 1, borderBottomColor: '#000', paddingBottom: 4 },
    assinaturaLabel: { fontSize: 10, color: '#64748b', marginTop: 6 },
});