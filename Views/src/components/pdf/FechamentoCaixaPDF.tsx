import { FC } from 'react';
import { Document, Page, Text, View, pdf } from '@react-pdf/renderer';
import type { CurrentOpeningResponse, BlindReceivingFinalResponse } from '@/types/cashiers/responses';
import { IFechamentoCaixaPDF } from './interfaces';
import { styles } from './styles';

export const FechamentoCaixaPDFDoc: FC<IFechamentoCaixaPDF> = ({ abertura, resultado, assinatura }) => (
    <Document>
        <Page size="A5" style={styles.page}>
            <View style={styles.header}>
                <Text style={styles.appName}>EasySale • Relatório de Caixa</Text>
                <Text style={styles.title}>Fechamento de Caixa</Text>
            </View>

            <View style={styles.metaBlock}>
                <Text style={styles.metaLine}>
                    <Text style={styles.metaLabel}>Caixa: </Text>
                    {abertura.caixaDescricao}
                </Text>
                <Text style={styles.metaLine}>
                    <Text style={styles.metaLabel}>Data de abertura: </Text>
                    {new Date(abertura.dataAbertura).toLocaleString('pt-BR')}
                </Text>
            </View>

            <View style={styles.card}>
                <Text style={styles.resumoTitulo}>Resumo financeiro</Text>
                <View style={styles.row}>
                    <Text style={styles.label}>Valor inicial</Text>
                    <Text style={styles.value}>R$ {abertura.valorInicial?.toFixed(2) ?? 0}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Total vendas</Text>
                    <Text style={styles.value}>R$ {abertura.totalVendas?.toFixed(2) ?? 0}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Suprimentos</Text>
                    <Text style={styles.value}>R$ {abertura.totalSuprimentos?.toFixed(2) ?? 0}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Sangrias</Text>
                    <Text style={styles.value}>R$ {abertura.totalSangrias?.toFixed(2) ?? 0}</Text>
                </View>
            </View>

            <View style={styles.card}>
                <Text style={styles.resumoTitulo}>Conferência cega</Text>
                <View style={styles.row}>
                    <Text style={styles.label}>Valor esperado</Text>
                    <Text style={styles.value}>R$ {resultado.valorEsperado?.toFixed(2) ?? 0}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Valor informado</Text>
                    <Text style={styles.value}>R$ {resultado.valorInformado?.toFixed(2) ?? 0}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Diferença</Text>
                    <Text style={resultado.batido ? styles.diffOk : styles.diffError}>
                        {resultado.diferenca?.toFixed(2) === undefined
                            ? 'R$ 0,00'
                            : `R$ ${resultado.diferenca?.toFixed(2) ?? 0}`}
                    </Text>
                </View>
            </View>

            <View style={styles.assinaturaArea}>
                <View style={styles.assinaturaLinha} />
                <Text style={styles.assinaturaLabel}>
                    Assinatura: {assinatura || '_________________________'}
                </Text>
            </View>
        </Page>
    </Document>
);

export async function gerarPdfFechamento(
    abertura: CurrentOpeningResponse,
    resultado: BlindReceivingFinalResponse,
    assinatura?: string
): Promise<Blob> {
    const blob = await pdf(
        <FechamentoCaixaPDFDoc abertura={abertura} resultado={resultado} assinatura={assinatura} />
    ).toBlob();
    return blob;
}
